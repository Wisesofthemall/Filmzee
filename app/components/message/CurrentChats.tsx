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
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
type Props = {
  selected: ChatType;
  showCurrent: any;
  setShowCurrent: any;
  setHide: any;
  hide: any;
  setImage: any;
};

function CurrentChats({
  selected,
  showCurrent,
  setShowCurrent,
  setHide,
  hide,
  setImage,
}: Props) {
  const [userInfo, setUserInfo] = useState<any>({});
  const [newMessage, setNewMessage] = useState("");
  const [messagePhoto, setMessagePhoto] = useState<any>(null);
  const [scroll, setScroll] = useState(false);
  const roomId = selected.roomId;

  const messagesRef = collection(db, "messages");
  const queryRef = query(messagesRef, where("roomId", "==", roomId));
  const [messages, setMessages] = useState<any[]>([]);

  const [Message] = useCollectionData(queryRef);

  const loginUser = useAuth();

  const handleSubmit = async (e: any) => {
    if (newMessage === "" && !messagePhoto) return;
    const message = newMessage.length !== 0 ? filter.clean(newMessage) : null;
    await addDoc(messagesRef, {
      text: message,
      image: messagePhoto,
      sender: {
        ...loginUser,
        displayName: userInfo.name,
        photoUrl: userInfo.photoUrl,
      },
      createdAt: new Date(),
      roomId,
    });

    setNewMessage("");
    setMessagePhoto(null);
    setScroll(true);
    setScroll(false);
  };
  const handleEnter = async (e: any) => {
    if (e === "Enter") {
      if (newMessage === "" && !messagePhoto) return;
      const message = newMessage.length !== 0 ? filter.clean(newMessage) : null;
      if (!message) return;
      await addDoc(messagesRef, {
        text: message,
        image: messagePhoto,
        sender: {
          ...loginUser,
          displayName: userInfo.name,
          photoUrl: userInfo.photoUrl,
        },
        createdAt: new Date(),
        roomId,
      });

      setNewMessage("");

      setMessagePhoto(null);
      setScroll(true);
      setScroll(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    setScroll(true);
    setScroll(false);
  }, [selected]);

  const getInfo = async () => {
    const result = await getUserByLocalId(loginUser.localId);

    setUserInfo(result);
  };

  useEffect(() => {
    if (loginUser) {
      getInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser]);

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
              setImage={setImage}
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
      <div className="bottom-0 px-4 flex h-[7.5rem]">
        <MessageInput
          id={"message"}
          value={newMessage}
          stateChange={setNewMessage}
          label="Start a message"
          required
          submit={handleSubmit}
          enter={handleEnter}
          messagePhoto={messagePhoto}
          setMessagePhoto={setMessagePhoto}
        />
      </div>
    </div>
  );
}

export default CurrentChats;
