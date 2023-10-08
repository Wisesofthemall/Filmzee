"use client";
import MessageInput from "../inputs/MessageInput";
import { filter } from "@/functions/profanityBlocker";

import React, { useEffect, useState } from "react";

import { collection, addDoc, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/auth/Firebase";
import { useAuth } from "@/auth/AuthState";
import { ChatType } from "@/types/Types";
import Header from "../inputs/Header";
import Messages from "./Messages";
type Props = {
  selected: ChatType;
  showCurrent: any;
  setShowCurrent: any;
  setHide: any;
  hide: any;
};

function CurrentChats({
  selected,
  showCurrent,
  setShowCurrent,
  setHide,
  hide,
}: Props) {
  const [newMessage, setNewMessage] = useState("");
  const [scroll, setScroll] = useState(false);
  const roomId = [...selected.userId, ...selected.recepientLocalID]
    .sort()
    .join("");

  const messagesRef = collection(db, "messages");
  const queryRef = query(messagesRef, where("roomId", "==", roomId));
  const [messages, setMessages] = useState<any[]>([]);

  const [Message] = useCollectionData(queryRef);

  const loginUser = useAuth();

  const handleSubmit = async (e: any) => {
    if (newMessage === "") return;
    const message = filter.clean(newMessage);
    await addDoc(messagesRef, {
      text: message,
      sender: loginUser,
      createdAt: new Date(),
      roomId,
    });

    setNewMessage("");
  };
  const handleEnter = async (e: any) => {
    if (e === "Enter") {
      if (newMessage === "") return;
      const message = filter.clean(newMessage);
      await addDoc(messagesRef, {
        text: message,
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
  if (selected.show === false) {
    return (
      <div
        className={`bg-gray-900  ${
          hide ? "hidden" : "col-span-10 md:col-span-7"
        }  rounded-lg m-2 flex flex-col h-full p-2`}
      >
        <div className="flex-grow h-[25rem]">Please Select a Chat</div>
      </div>
    );
  }

  return (
    <div
      className={`bg-gray-900  ${
        showCurrent
          ? " col-span-10 md:col-span-7"
          : "hidden md:col-span-7 md:flex"
      }  rounded-lg m-2 flex flex-col h-full p-2`}
    >
      <Header
        localId={selected.recepientLocalID}
        showCurrent={showCurrent}
        setShowCurrent={setShowCurrent}
        photo={selected.recepientPhoto}
        name={selected.recepientName}
        uniq={selected.recepientUniq}
        email={selected.recepientEmail}
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
