"use client";
import React, { useState } from "react";
import Search from "../Search";
import UserSearch from "../user/UserSearch";
import ChatsContainer from "../chats/ChatsContainer";
import { useAuth } from "@/auth/AuthState";
import { getUserByUniq } from "@/database/usersCRUD/Supabase";
import { UserType } from "@/types/Types";
import {
  getAllChatsbySenderId,
  getChatBySenderId,
  retrieveChat,
} from "@/database/chatsCRUD/Supabase";

type Props = {
  selected: boolean;
};

function MyChats({ selected }: Props) {
  const [myChats, setMyChats] = useState<any[] | null>([]);
  const loginUser = useAuth();

  const getChat: any = async (userId: number) => {
    if (loginUser) {
      const login: UserType = await getUserByUniq(loginUser.createdAt);
      console.log(login);
      // const customId = parseInt(
      //   [...(login.id.toString() + userId.toString())].sort().join(""),
      // );

      const theChat = await retrieveChat(null, login.id, userId);
      console.log(theChat);
      const allChats = await getAllChatsbySenderId(loginUser.id);
      console.log(allChats);
      setMyChats(allChats);
    }
  };

  if (loginUser) {
    const Chats = getChatBySenderId(loginUser.id);
    console.log(Chats);
  }

  return (
    <div
      className={`bg-white text-black  col-span-3 md:block rounded-lg m-2 p-3 ${
        selected ? "" : ""
      } `}
    >
      <UserSearch getChat={getChat} />
      <ChatsContainer myChats={myChats} />
    </div>
  );
}

export default MyChats;
