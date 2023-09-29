"use client";
import React, { useEffect, useState } from "react";

import UserSearch from "../user/UserSearch";
import ChatsContainer from "../chats/ChatsContainer";
import { useAuth } from "@/auth/AuthState";

import { FirebaseUserType } from "@/types/Types";
import { getAllChatsbyID } from "@/database/chatsCRUD/Supabase";

type Props = {
  selected: any;
  setSelected: any;
};

function MyChats({ selected, setSelected }: Props) {
  const [myChats, setMyChats] = useState<any[] | null>([]);
  const loginUser: FirebaseUserType = useAuth();

  const getChat: any = async (chats: any) => {
    setMyChats(chats);
  };
  const getAllChat = async () => {
    const chats = await getAllChatsbyID(loginUser.localId);

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
      className={`bg-gray-900 text-black  col-span-3 md:block rounded-lg m-2 p-3 ${
        selected ? "" : ""
      } `}
    >
      <UserSearch getChat={getChat} />
      <ChatsContainer
        myChats={myChats}
        setSelected={setSelected}
        selected={selected}
      />
    </div>
  );
}

export default MyChats;
