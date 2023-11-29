"use client";
import React, { useEffect, useState } from "react";
import UserSearch from "../user/UserSearch";
import ChatsContainer from "./ChatsContainer";
import { useAuth } from "@/auth/AuthState";
import { ChatType, FirebaseUserType, UserType } from "@/types/Types";
import { getAllChatsbyID } from "@/database/chatsCRUD/Supabase";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
import { IoReload } from "react-icons/io5";
import toast from "react-hot-toast";
import GroupChatModal from "../modals/GroupChatModal";

type Props = {
  selected: ChatType;
  setSelected: React.Dispatch<React.SetStateAction<ChatType>>;
  showCurrent: boolean;
  setShowCurrent: React.Dispatch<React.SetStateAction<boolean>>;
  hide: boolean;
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
};

function MyChats({
  selected,
  setSelected,
  showCurrent,
  setShowCurrent,
  hide,
  setHide,
}: Props) {
  const [myChats, setMyChats] = useState<ChatType[]>([]);
  const loginUser: FirebaseUserType = useAuth();
  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  //* Set MyChats
  const getChat = async (chats: ChatType[]) => {
    setMyChats(chats);
  };
  //* Get all the chats the login User is in
  const getAllChat = async () => {
    const chats = await getAllChatsbyID(loginUser.localId);

    if (chats) {
      setMyChats(chats);
    }
  };
  //* Set User Info
  const getUserInfo = async () => {
    const user: UserType | null = await getUserByLocalId(loginUser.localId);
    setUserInfo(user);
  };

  //* Invoke these function everytime the login User changes
  useEffect(() => {
    if (loginUser) {
      getAllChat();
      getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser]);

  return (
    <div
      className={`bg-gray-900 text-black   md:block rounded-lg m-2 p-3 overflow-y-scroll ${
        showCurrent ? " hidden md:col-span-3 " : " col-span-10 "
      } ${hide ? " col-span-10  " : ""}
       ${!showCurrent && !hide ? "md:col-span-3" : "md:col-span-10 "} `}
    >
      <GroupChatModal getAllChat={getAllChat} />
      <UserSearch getChat={getChat} loginInfo={userInfo} />
      <div
        onClick={() => {
          getAllChat();
          toast.success("Reloaded Chats Sucessfully");
        }}
        className="text-white font-bold text-end flex justify-end px-6 cursor-pointer w-fit"
      >
        <IoReload size={20} />
      </div>
      <ChatsContainer
        setHide={setHide}
        setShowCurrent={setShowCurrent}
        myChats={myChats}
        setSelected={setSelected}
        selected={selected}
      />
    </div>
  );
}

export default MyChats;
