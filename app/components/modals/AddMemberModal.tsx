"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../inputs/Heading";
import Modal from "./Modal";
import { useAuth } from "@/auth/AuthState";
import { FirebaseUserType, MemberType } from "@/types/Types";
import { createGroupChat } from "@/database/chatsCRUD/Supabase";

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

type Props = {
  roomId: string;
  chatName: string;
  chatImage: string;
  uniq: string;
};

enum STEPS {
  NAME,
}
function AddMemberModal({ chatName, chatImage, roomId, uniq }: Props) {
  const addMember = useAddMemberModal();
  const [hide, setHide] = useState(true);
  const [query, setQuery] = useState("");
  const [apiQuery, setApiQuery] = useState("");
  const [typing, setTyping] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const loginUser: FirebaseUserType = useAuth();

  const [step, setStep] = useState(STEPS.NAME);
  const [members, setMembers] = useState<MemberType | {}>({});
  const [docID, setDocID] = useState("");
  const groupInfoRef = collection(db, "groupInfo");
  const [existingMembers, setExistingMembers] = useState([]);

  const membersRef = fireQuery(groupInfoRef, where("roomId", "==", roomId));
  const [Posts] = useCollectionData(membersRef);

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
  const handleOnChange = (event: any) => {
    setQuery(event.target.value);
    setTyping(true);
  };

  //*Remove member from the groupchat invite list
  const handleDeleteMember = (member: MemberType) => {
    //* Check if Owner try to remove themselves (They can't do that)
    if (member.localId === userInfo.localId) {
      toast.error("You can not remove yourself from the group");
      return;
    }
    //* Removes the user
    setMembers((prevMembers: any) => {
      const { [member.localId]: deletedValue, ...newMembers } = prevMembers;
      return newMembers;
    });
    toast.success(`${member.name} removed from group`);
  };

  //* Adds a user to the groupchat invite list
  const handleAddMember = (member: MemberType) => {
    let check = existingMembers.filter(
      (mem: any) => mem.localId === member.localId,
    );

    //* Check if user already in groupchat
    if (check.length === 1) {
      toast.error("Cannot add member that already in group");
      return;
    }

    //* Add user to the groupchat invite list
    setMembers((prevMembers: any) => {
      return { ...prevMembers, [member.localId]: member };
    });
    toast.success(`${member.name} added to group`);
  };

  //* Get and store the list of existing members in the groupchat
  const getMembersInfo = async () => {
    if (Posts) {
      setExistingMembers(Posts[0].membersArray);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Posts]);

  //* Add users in the groupchat invite list to the actual groupchat
  const onSubmit = async () => {
    //* Convert it to an array of Users
    const membersArray: any = Object.values(members);

    //* Add users to the groupchat and update the 'groupInfo' with the new members
    try {
      await createGroupChat(membersArray, chatName, chatImage, roomId, uniq);
      toast.success("Sucessfully added members");
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
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  let bodyContent = (
    <div className="items-center">
      <Heading title="Add members to your group" />
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
        {Object.values(members).map((mem: any) => (
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

  return (
    <Modal
      isOpen={addMember.isOpen}
      onClose={addMember.onClose}
      title="Add a Member"
      actionLabel={"Add Members"}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default AddMemberModal;
