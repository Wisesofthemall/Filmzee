"use client";
import MessageInput from "../inputs/MessageInput";

import React, { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/auth/Firebase";
import { useAuth } from "@/auth/AuthState";
import { ChatType } from "@/types/Types";
import Header from "../inputs/Header";
import Messages from "./Messages";
type Props = {
  selected: any | ChatType;
};

function CurrentChats({ selected }: Props) {
  const [newMessage, setNewMessage] = useState("");
  const roomId = [...selected.userId, ...selected.recepientLocalID]
    .sort()
    .join("");

  const messagesRef = collection(db, "messages");
  const queryRef = query(messagesRef, orderBy("createdAt", "asc"));
  const [messages, setMessages] = useState<any[]>([]);

  const [Message] = useCollectionData(queryRef);

  const loginUser = useAuth();

  const handleSubmit = async (e: any) => {
    console.log(e);
    if (e) {
      if (e.key === "Enter") {
        if (newMessage === "") return;

        await addDoc(messagesRef, {
          text: newMessage,
          sender: loginUser,
          createdAt: serverTimestamp(),
          roomId,
        });

        setNewMessage("");
      }
    }
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      sender: loginUser,
      createdAt: serverTimestamp(),
      roomId,
    });

    setNewMessage("");
  };

  useEffect(() => {
    if (Message) {
      const filterMessage = Message.filter(
        (message) => message.roomId === roomId,
      );

      setMessages(filterMessage);
    }
  }, [Message, roomId]);

  return (
    <div
      className={`bg-gray-900 col-span-7  rounded-lg m-2 flex flex-col h-full p-2`}
    >
      <Header
        photo={selected.recepientPhoto}
        name={selected.recepientName}
        uniq={selected.recepientUniq}
      />
      <div className="flex-grow">
        {messages ? (
          <Messages messages={messages} loginUser={loginUser} />
        ) : (
          "Introduce yourself !!! Dont be shy"
        )}
      </div>
      <div className="bottom-0 px-4 flex">
        <MessageInput
          id={"message"}
          value={newMessage}
          stateChange={setNewMessage}
          label="Type your message here..."
          required
          submit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default CurrentChats;
