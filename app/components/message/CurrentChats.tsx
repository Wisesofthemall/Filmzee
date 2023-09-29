"use client";
import Input from "../inputs/Input";
import MessageInput from "../inputs/MessageInput";
import SendIcon from "../inputs/SendIcon";
import Messages from "./Messages";
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
type Props = {
  selected: boolean;
  roomId?: number;
};

function CurrentChats({ selected, roomId = 32093 }: Props) {
  const [newMessage, setNewMessage] = useState("");
  //! const messagesRef = collection(db, "messages");
  const messagesRef = collection(db, "messages");
  const queryRef = query(messagesRef, orderBy("createdAt", "desc"));
  const filteredQuery = where("roomId", "==", roomId);
  const finalQueryRef = query(queryRef, filteredQuery);
  const [messages] = useCollectionData(finalQueryRef);
  console.log(messages);

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

  return (
    <div
      className={`bg-gray-900 col-span-7  rounded-lg m-2 flex flex-col h-full p-2`}
    >
      <div className="flex-grow">
        {/* <Messages roomId={2233} messages={messages} /> */}
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
