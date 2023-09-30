"use client";
import MessageInput from "../inputs/MessageInput";

import React, { useEffect, useRef, useState } from "react";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/auth/Firebase";
import { useAuth } from "@/auth/AuthState";
import { ChatType } from "@/types/Types";
import Header from "../inputs/Header";
import Messages from "./Messages";
type Props = {
  selected: any | ChatType;
  showCurrent: any;
  setShowCurrent: any;
};

function CurrentChats({ selected, showCurrent, setShowCurrent }: Props) {
  const [newMessage, setNewMessage] = useState("");
  const [scroll, setScroll] = useState(false);
  const roomId = [...selected.userId, ...selected.recepientLocalID]
    .sort()
    .join("");

  const messagesRef = collection(db, "messages");
  const queryRef = query(messagesRef, where("roomId", "==", roomId));
  const [messages, setMessages] = useState<any[]>([]);

  const [Message] = useCollectionData(queryRef);
  console.log(Message);

  const loginUser = useAuth();

  const handleSubmit = async (e: any) => {
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      sender: loginUser,
      createdAt: serverTimestamp(),
      roomId,
    });

    setNewMessage("");
  };
  const handleEnter = async (e: any) => {
    if (e === "Enter") {
      if (newMessage === "") return;

      await addDoc(messagesRef, {
        text: newMessage,
        sender: loginUser,
        createdAt: new Date(),
        roomId,
      });

      setNewMessage("");
      setScroll(true);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (Message) {
      const filterMessage = Message.sort(function (a, b) {
        // Convert Firestore Timestamps to JavaScript Date objects

        const dateA = a.createdAt.toDate();
        const dateB = b.createdAt.toDate();

        // Compare the Date objects to sort in ascending order
        return dateA - dateB;
      });

      setMessages(filterMessage);
      setScroll(true);
    }
  }, [Message, roomId]);

  return (
    <div
      className={`bg-gray-900  ${
        showCurrent
          ? " col-span-10 md:col-span-7"
          : "hidden md:col-span-7 md:flex"
      }  rounded-lg m-2 flex flex-col h-full p-2`}
    >
      <Header
        showCurrent={showCurrent}
        setShowCurrent={setShowCurrent}
        photo={selected.recepientPhoto}
        name={selected.recepientName}
        uniq={selected.recepientUniq}
      />
      <div className="flex-grow h-[25rem]">
        {messages ? (
          <div className="h-full">
            <Messages
              messages={messages}
              loginUser={loginUser}
              scroll={scroll}
              setScroll={setScroll}
            />
          </div>
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
          enter={handleEnter}
        />
      </div>
    </div>
  );
}

export default CurrentChats;
