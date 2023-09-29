"use client";
import Input from "../inputs/Input";
import MessageInput from "../inputs/MessageInput";
import SendIcon from "../inputs/SendIcon";

import React, { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  arrayUnion,
  Firestore,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db } from "@/auth/Firebase";
import { useAuth } from "@/auth/AuthState";
import { ChatType } from "@/types/Types";
import Header from "../inputs/Header";
import message from "@/pages/message";
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

  const handleSubmit = async () => {
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

  console.log(selected);

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
