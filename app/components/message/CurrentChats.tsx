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
  console.log(selected);
  const [newMessage, setNewMessage] = useState("");
  const roomId = [...selected.userId, ...selected.recepientLocalID]
    .sort()
    .join("");

  //! const messagesRef = collection(db, "messages");
  const messagesRef = collection(db, "messages");
  const queryRef = query(messagesRef, orderBy("createdAt", "asc"));
  const [messages, setMessages] = useState<any[]>([]);
  // const filteredQuery = where("roomId", "==", roomId);
  // const finalQueryRef = query(queryRef, filteredQuery);
  const [Message] = useCollectionData(queryRef);

  const loginUser = useAuth();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

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
      console.log(filterMessage);
      setMessages(filterMessage);
    }
  }, [Message, roomId]);

  return (
    <div
      className={`bg-gray-900 col-span-7  rounded-lg m-2 flex flex-col h-full p-2`}
    >
      <Header photo={selected.recepientPhoto} name={selected.recepientName} />
      <div className="flex-grow">
        {messages ? (
          <Messages messages={messages} loginUser={loginUser} />
        ) : (
          "npting"
        )}
      </div>
      <div className="bottom-0 px-4 flex">
        {/* <MessageInput id={"message"} value={""} label="Send Message" /> */}
        <form onSubmit={handleSubmit} className="new-message-form">
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className="new-message-input"
            placeholder="Type your message here..."
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
        <SendIcon />
      </div>
    </div>
  );
}

export default CurrentChats;
