"use client";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../inputs/Heading";
import Modal from "./Modal";
import { useAuth } from "@/auth/AuthState";
import { FirebaseMemberType, FirebaseUserType, UserType } from "@/types/Types";
import {
  createGroupChat,
  getChatByRoomId,
  getGroupChatInfoByRoomId,
  updateGroupChatInfo,
} from "@/database/chatsCRUD/Supabase";

import { Skeleton } from "@mui/material";
import MembersQuery from "../members/MembersQuery";
import MemberCard from "../members/MemberCard";
import { db } from "@/auth/Firebase";
import {
  collection,
  getDocs,
  where,
  query as fireQuery,
  updateDoc,
  doc,
} from "firebase/firestore";
import useAddMemberModal from "@/app/hooks/useAddMemberModal";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ImageUploader from "../inputs/ImageUploader";
import { useRouter } from "next/navigation";

type Props = {
  roomId: string;
  chatName: string;
  chatImage: string;
  uniq: string;
};

enum STEPS {
  NAME,
  GROUPIMG,
  MEMBERS,
}
function EditGroupChatModal({ chatName, chatImage, roomId, uniq }: Props) {
  const addMember = useAddMemberModal();
  const [hide, setHide] = useState(true);
  const [query, setQuery] = useState("");
  const [apiQuery, setApiQuery] = useState("");
  const [typing, setTyping] = useState(false);
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const loginUser: FirebaseUserType = useAuth();
  const [groupName, setGroupName] = useState("");
  const [groupIMG, setGroupIMG] = useState("");
  const [step, setStep] = useState(STEPS.NAME);
  const [members, setMembers] = useState<
    { [key: string]: FirebaseMemberType } | {}
  >({});
  const [docID, setDocID] = useState("");
  const groupInfoRef = collection(db, "groupInfo");
  const [existingMembers, setExistingMembers] = useState<FirebaseMemberType[]>(
    [],
  );
  const router = useRouter();

  const membersRef = fireQuery(groupInfoRef, where("roomId", "==", roomId));
  const [Posts] = useCollectionData(membersRef);

  //* Set the state to the previous state
  const onBack = () => {
    setStep((value) => value - 1);
  };
  //* Set the state to the next state
  const onNext = () => {
    setStep((value) => value + 1);
  };

  //* Add update info to the database
  const onSubmit = async () => {
    //* If user is not in the last step then go to the next step
    if (step !== STEPS.MEMBERS) {
      return onNext();
    }
    //* Convert it to an array of Users
    const membersArray: FirebaseMemberType[] = Object.values(members);

    //* Add users to the groupchat and update the 'groupInfo' with the new members
    try {
      await updateGroupChatInfo(groupName, groupIMG, roomId);
      await createGroupChat(membersArray, chatName, chatImage, roomId, uniq);
      toast.success("Sucessfully edit groupchat");
      addMember.onClose();
      const groupRef = doc(db, "groupInfo", docID);

      const updatedMembers = existingMembers.concat(membersArray);

      if (Posts) {
        await updateDoc(groupRef, {
          membersArray: updatedMembers,
        });
      }

      setMembers({});
      setStep(STEPS.NAME);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  //* If the user at the last step then 'Edit' if not then 'Next'
  const actionLabel = useMemo(() => {
    if (step === STEPS.MEMBERS) {
      return "Edit";
    }
    return "Next";
  }, [step]);

  //* If the user is in the first step return nothing else return 'Back'
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.NAME) {
      return undefined;
    }
    return "Back";
  }, [step]);

  //* This useEffect is use to check if the user stop typing for 1 second
  //* If so then make a query to the database
  //* This prevent over calling the database when the user isn't even finish typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length) {
        setApiQuery(query);
        setTyping(false);
        setHide(false);
      } else {
        setHide(true);
        setTyping(false);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [query]);

  //* Grabs the infomation on the groupchat info the user is in
  const q = fireQuery(groupInfoRef, where("roomId", "==", roomId));

  //* Get the Document ID of the current groupchat and store it
  const getDocName = async () => {
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const documentID = doc.id;

          setDocID(documentID);
        });
      })
      .catch((error) => {
        console.error("Error querying documents: ", error);
      });
  };

  //* When the user start typing then store the value and set typing to true
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setTyping(true);
  };

  //*Remove member from the groupchat invite list
  const handleDeleteMember = (member: FirebaseMemberType) => {
    //* Check if Owner try to remove themselves (They can't do that)
    if (member.localId === userInfo?.localId) {
      toast.error("You can not remove yourself from the group");
      return;
    }
    //* Removes the user
    setMembers((prevMembers: { [key: string]: FirebaseMemberType }) => {
      const { [member.localId]: deletedValue, ...newMembers } = prevMembers;
      return newMembers;
    });
    toast.success(`${member.name} removed from group`);
  };

  //* Adds a user to the groupchat invite list
  const handleAddMember = (member: FirebaseMemberType) => {
    let check = existingMembers.filter(
      (mem: FirebaseMemberType) => mem.localId === member.localId,
    );

    //* Check if user already in groupchat
    if (check.length === 1) {
      toast.error("Cannot add member that already in group");
      return;
    }

    //* Add user to the groupchat invite list
    setMembers((prevMembers: { [key: string]: FirebaseMemberType }) => {
      return { ...prevMembers, [member.localId]: member };
    });
    toast.success(`${member.name} added to group`);
  };

  //* Get and store the list of existing members in the groupchat
  const getMembersInfo = async () => {
    if (Posts && Posts[0]) {
      setExistingMembers(Posts[0].membersArray);
    }
  };

  const getGroupInfo = async () => {
    const result = await getGroupChatInfoByRoomId(roomId);
    if (result) {
      setGroupName(result.recepientName);
      setGroupIMG(result.recepientPhoto);
    }
  };

  useEffect(() => {
    if (loginUser) {
      getDocName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser]);
  useEffect(() => {
    getMembersInfo();
    getGroupInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Posts]);

  let bodyContent = (
    <div className="">
      <div className="items-center">
        <Heading
          title="What would you like to change your group to be named? "
          subtitle="Press next to continue"
        />
        <hr />
        <div className="z-50 my-8">
          <div className="bg-black rounded-lg grid grid-cols-10 w-full mb-4">
            <input
              onChange={(e) => setGroupName(e.target.value)}
              className="rounded-lg bg-black text-white  border-[1px] border-white col-span-8 outline-none p-1"
              value={groupName}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (step === STEPS.GROUPIMG) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">
        <Heading
          title="What is a background picture that describes your group?"
          subtitle="Press next to continue"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          <div className="col-span-full">
            <ImageUploader value={groupIMG} onChange={setGroupIMG} />
          </div>
        </div>
      </div>
    );
  }
  if (step === STEPS.MEMBERS) {
    bodyContent = (
      <div className="items-center">
        <Heading
          title="Add members to your group"
          subtitle="Press edit if you do not want to add any members"
        />
        <hr />
        <div className="z-50 my-8">
          <div className="bg-black rounded-lg grid grid-cols-10 w-full mb-4">
            <input
              onChange={(e) => handleOnChange(e)}
              className="rounded-lg bg-black text-white  border-[1px] border-white col-span-8 outline-none p-1"
              placeholder="Search for Users by Email"
            />
          </div>
          <div className="px-5">
            {typing ? (
              <div className="absolute">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", bgcolor: "grey.400" }}
                  width={300}
                  height={50}
                />
              </div>
            ) : (
              <div className="w-45">
                {" "}
                <MembersQuery
                  query={apiQuery}
                  hide={hide}
                  setHide={setHide}
                  addMember={handleAddMember}
                />
              </div>
            )}
          </div>
        </div>
        <div className="text-white font-bold text-xl mb-2">Members: </div>
        <div className="flex items-center overflow-x-scroll w-full">
          {Object.values(members).map((mem: FirebaseMemberType) => (
            <MemberCard
              mem={mem}
              key={mem.localId}
              onRemove={handleDeleteMember}
            />
          ))}
          {Object.values(members).length === 0 && (
            <div className="text-white "> No New Members Added</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={addMember.isOpen}
      onClose={addMember.onClose}
      title="Add a Member"
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.NAME ? undefined : onBack}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default EditGroupChatModal;
