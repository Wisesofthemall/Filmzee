"use client";
import React, { useEffect, useState } from "react";
import Search from "../Search";
import UserSearch from "../user/UserSearch";
import ChatsContainer from "../chats/ChatsContainer";
import { useAuth } from "@/auth/AuthState";
import { getUserByUniq } from "@/database/usersCRUD/Supabase";
import { FirebaseUserType, UserType } from "@/types/Types";
import { getAllChatsbyID, retrieveChat } from "@/database/chatsCRUD/Supabase";

type Props = {
  selected: boolean;
};

function MyChats({ selected }: Props) {
  const [myChats, setMyChats] = useState<any[] | null>([]);
  const loginUser: FirebaseUserType = useAuth();

  const getChat: any = async (chats: any) => {
    console.log(chats);
    setMyChats(chats);
  };
  const getAllChat = async () => {
    const chats = await getAllChatsbyID(loginUser.localId);
    console.log(chats);
    setMyChats(chats);
  };

  useEffect(() => {
    if (loginUser) {
      getAllChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser]);

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
