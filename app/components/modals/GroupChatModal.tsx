"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import Heading from "../inputs/Heading";
import Input from "../inputs/Input";
import Button from "../inputs/Button";

import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { firebaseAuth } from "@/auth/Firebase";

import useSignupModal from "@/app/hooks/useSignupModal";
import useCreateGroupChatModal from "@/app/hooks/useCreateGroupChat";
import SearchQuery from "../user/SearchQuery";
import { useAuth } from "@/auth/AuthState";
import { FirebaseUserType, MemberType, UserType } from "@/types/Types";
import {
  createGroupChat,
  getAllChatsbyID,
} from "@/database/chatsCRUD/Supabase";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
import { Avatar, Skeleton } from "@mui/material";
import ImageUploader from "../inputs/ImageUploader";
import MembersQuery from "../members/MembersQuery";
import Image from "next/image";
import { color } from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import { colorMaker } from "@/functions/profileGenerator";
import MemberCard from "../members/MemberCard";
import { v4 as uuidv4 } from "uuid";
import { uniqGenerator } from "@/functions/uniqGenerator";

type Props = {};

enum STEPS {
  NAME,
  IMAGE,
  MEMBERS,
}
function GroupChatModal({}: Props) {
  const groupChatModal = useCreateGroupChatModal();
  const [username, setUsername] = useState<string>("");
  const [hide, setHide] = useState(true);
  const [query, setQuery] = useState("");
  const [apiQuery, setApiQuery] = useState("");
  const [typing, setTyping] = useState(false);
  const [myChats, setMyChats] = useState<any[] | null>([]);
  const [userInfo, setUserInfo] = useState<any>({});
  const loginUser: FirebaseUserType = useAuth();
  const [chatName, setChatName] = useState("");
  const [chatImage, setChatImage] = useState("");
  const [step, setStep] = useState(STEPS.NAME);
  const [members, setMembers] = useState<MemberType | {}>({});

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

  const handleOnChange = (event: any) => {
    setQuery(event.target.value);
    setTyping(true);
  };

  const handleDeleteMember = (member: MemberType) => {
    if (member.localId === userInfo.localId) {
      toast.error("You cannot remove yourself from the group");
      return;
    }
    setMembers((prevMembers: any) => {
      const { [member.localId]: deletedValue, ...newMembers } = prevMembers;
      return newMembers;
    });
    toast.success(`${member.name} removed from group`);
  };
  const handleAddMember = (member: MemberType) => {
    setMembers((prevMembers: any) => {
      return { ...prevMembers, [member.localId]: member };
    });
    toast.success(`${member.name} added to group`);
  };

  useEffect(() => {
    if (loginUser) {
      if (loginUser.displayName) {
        setUsername(loginUser.displayName);
      } else {
        const parsedName = loginUser.email?.split("@")[0];
        setUsername(parsedName);
      }
      getAllChat();
      getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser]);

  const getChat: any = async (chats: any) => {
    setMyChats(chats);
  };
  const getAllChat = async () => {
    const chats = await getAllChatsbyID(loginUser.localId);

    setMyChats(chats);
  };
  const getUserInfo = async () => {
    const user: UserType = await getUserByLocalId(loginUser.localId);
    setUserInfo(user);
    setMembers((prevMembers: any) => {
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
  };

  let bodyContent = (
    <div className="">
      {" "}
      <Heading title="A cool name for your group" />
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
    const membersArray: any = Object.values(members);
    let roomId = uuidv4();
    let uniq = uniqGenerator();
    try {
      await createGroupChat(membersArray, chatName, chatImage, roomId, uniq);
      toast.success("Group chat created");
      groupChatModal.onClose();
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
                  name={username}
                  getChat={getChat}
                  setHide={setHide}
                  loginInfo={userInfo}
                  deleteMember={handleDeleteMember}
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
