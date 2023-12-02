"use client";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../inputs/Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";
import useCreateGroupChatModal from "@/app/hooks/useCreateGroupChat";
import { useAuth } from "@/auth/AuthState";
import { FirebaseMemberType, FirebaseUserType, UserType } from "@/types/Types";
import { createGroupChat } from "@/database/chatsCRUD/Supabase";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
import { Skeleton } from "@mui/material";
import ImageUploader from "../inputs/ImageUploader";
import MembersQuery from "../members/MembersQuery";
import MemberCard from "../members/MemberCard";
import { v4 as uuidv4 } from "uuid";
import { uniqGenerator } from "@/functions/uniqGenerator";
import { db } from "@/auth/Firebase";
import { addDoc, collection } from "firebase/firestore";

type Props = {
  getAllChat: () => void;
};

enum STEPS {
  NAME,
  IMAGE,
  MEMBERS,
}
function GroupChatModal({ getAllChat }: Props) {
  const groupChatModal = useCreateGroupChatModal();
  const [hide, setHide] = useState(true);
  const [query, setQuery] = useState("");
  const [apiQuery, setApiQuery] = useState("");
  const [typing, setTyping] = useState(false);
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const loginUser: FirebaseUserType = useAuth();
  const [chatName, setChatName] = useState("");
  const [chatImage, setChatImage] = useState("");
  const [step, setStep] = useState(STEPS.NAME);
  const [members, setMembers] = useState<{ [key: string]: FirebaseMemberType }>(
    {},
  );
  const groupInfoRef = collection(db, "groupInfo");

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

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setTyping(true);
  };

  //* Removes members from the group chat invite list
  const handleDeleteMember = (member: FirebaseMemberType) => {
    //* Check to see if the owner try to remove themselves (They can't do that)
    if (member.localId === userInfo?.localId) {
      toast.error("You can not remove yourself from the group");
      return;
    }
    //* Return object with deleted member from the group chat invite list
    setMembers((prevMembers: { [key: string]: FirebaseMemberType }) => {
      const { [member.localId]: deletedValue, ...newMembers } = prevMembers;
      return newMembers;
    });
    toast.success(`${member.name} removed from group`);
  };

  //* Add member to the group chat invite list
  const handleAddMember = (member: FirebaseMemberType) => {
    setMembers((prevMembers: { [key: string]: FirebaseMemberType }) => {
      return { ...prevMembers, [member.localId]: member };
    });
    toast.success(`${member.name} added to group`);
  };

  //* Setting the login user (owner) to be a member by default
  const getUserInfo = async () => {
    try {
      const user: UserType = await getUserByLocalId(loginUser.localId);
      setUserInfo(user);
      setMembers((prevMembers: { [key: string]: FirebaseMemberType }) => {
        return {
          ...prevMembers,
          [user.localId]: {
            name: user.name,
            email: user.email,
            photoUrl: user.photoUrl,
            localId: user.localId,
            uniq: user.uniq,
          },
        };
      });
    } catch (error) {
      console.error("Error Fetching User Info");
    }
  };

  useEffect(() => {
    if (loginUser) {
      getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser]);

  let bodyContent = (
    <div className="">
      {" "}
      <Heading title="A name for your group" />
      <hr />
      <Input
        id={"name"}
        value={chatName}
        label="Chat Name"
        stateChange={setChatName}
        dark
      />
    </div>
  );
  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = async () => {
    if (step !== STEPS.MEMBERS) {
      return onNext();
    }
    if (chatName.length === 0) {
      return toast.error("Please go back and enter a chat name");
    }
    if (Object.keys(members).length === 1) {
      return toast.error("Please add atleast one other member to your group");
    }
    const membersArray: FirebaseMemberType[] = Object.values(members);
    let roomId = uuidv4();
    let uniq = uniqGenerator();
    try {
      await createGroupChat(membersArray, chatName, chatImage, roomId, uniq);
      toast.success("Group chat created");
      groupChatModal.onClose();
      await addDoc(groupInfoRef, {
        roomId,
        uniq,
        chatName,
        chatImage,
        membersArray,
      });
      setChatName("");
      setChatImage("");
      setMembers((prevMembers: any) => {
        return {
          ...prevMembers,
          [(userInfo as UserType).localId]: {
            name: userInfo?.name,
            email: userInfo?.email,
            photoUrl: userInfo?.photoUrl,
            localId: userInfo?.localId,
            uniq: userInfo?.uniq,
          },
        };
      });
      setStep(STEPS.NAME);
      getAllChat();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.MEMBERS) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.NAME) {
      return undefined;
    }
    return "Back";
  }, [step]);

  if (step === STEPS.IMAGE) {
    bodyContent = (
      <div className="">
        <Heading title="An image for your group (optional)" />
        <hr />
        <ImageUploader value={chatImage} onChange={setChatImage} />
      </div>
    );
  }

  if (step === STEPS.MEMBERS) {
    bodyContent = (
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
          {Object.values(members).map((mem: FirebaseMemberType) => (
            <MemberCard
              mem={mem}
              key={mem.localId}
              onRemove={handleDeleteMember}
            />
          ))}
          {Object.values(members).length === 0 && (
            <div className="text-white "> No Members Added</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={groupChatModal.isOpen}
      onClose={groupChatModal.onClose}
      title="Create a GroupChat !"
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.NAME ? undefined : onBack}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default GroupChatModal;
