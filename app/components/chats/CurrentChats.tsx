"use client";
import MessageInput from "../inputs/MessageInput";
import { filter } from "@/functions/profanityBlocker";
import React, { useEffect, useState } from "react";
import { collection, addDoc, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/auth/Firebase";
import { useAuth } from "@/auth/AuthState";
import { ChatType, MessageType, UserType } from "@/types/Types";
import Header from "../inputs/Header";
import Messages from "../message/Messages";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
import { v4 as uuidv4 } from "uuid";

type Props = {
  selected: ChatType;
  showCurrent: boolean;
  setShowCurrent: React.Dispatch<React.SetStateAction<boolean>>;

  hide: boolean;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

function CurrentChats({
  selected,
  showCurrent,
  setShowCurrent,
  hide,
  setImage,
}: Props) {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messagePhoto, setMessagePhoto] = useState<string | null>(null);
  const [scroll, setScroll] = useState(false);
  const roomId = selected.roomId;

  const messagesRef = collection(db, "messages");
  const queryRef = query(messagesRef, where("roomId", "==", roomId));
  const [messages, setMessages] = useState<MessageType[]>([]);

  const [Message] = useCollectionData(queryRef);

  const loginUser = useAuth();

  //* Sends Message to Users
  const handleSubmit = async () => {
    //* Check if theres any content to be sent
    if (newMessage === "" && !messagePhoto) return;
    //* Filter out any curse words the user might've sent
    const message = newMessage.length !== 0 ? filter.clean(newMessage) : null;
    //* Add the message to our database
    await addDoc(messagesRef, {
      id: uuidv4(),
      text: message,
      image: messagePhoto,
      sender: {
        ...loginUser,
        displayName: userInfo?.name,
        photoUrl: userInfo?.photoUrl,
      },
      createdAt: new Date(),
      roomId,
      edit: false,
    });
    //* Reset Message States
    setNewMessage("");
    setMessagePhoto(null);
    //* Activate auto scroll
    setScroll(true);
    setScroll(false);
  };

  //* Sends Message to Users
  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    //* Check if user press the 'Enter' Key
    if (e.key === "Enter") {
      //* Check if theres any content to be sent
      if (newMessage.length === 0 && !messagePhoto) return;
      //* Filter out any curse words the user might've sent
      const message = newMessage.length !== 0 ? filter.clean(newMessage) : null;
      //* Add the message to our database
      await addDoc(messagesRef, {
        id: uuidv4(),
        text: message,
        image: messagePhoto,
        sender: {
          ...loginUser,
          displayName: userInfo?.name,
          photoUrl: userInfo?.photoUrl,
        },
        createdAt: new Date(),
        roomId,
        edit: false,
      });

      //* Reset Message States
      setNewMessage("");
      setMessagePhoto(null);
      //* Activate auto scroll
      setScroll(true);
      setScroll(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    //* Activate Auto Scroll
    setScroll(true);
    setScroll(false);
  }, [selected]);

  //* Set the User Info
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
    //* Sort Messages between the users by time
    if (Message) {
      const filterMessage = Message.sort(function (a, b) {
        // Convert Firestore Timestamps to JavaScript Date objects

        const dateA = a.createdAt.toDate();
        const dateB = b.createdAt.toDate();

        // Compare the Date objects to sort in ascending order
        return dateA - dateB;
      });

      setMessages(filterMessage as MessageType[]);
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
        setShowCurrent={setShowCurrent}
        photo={selected.recepientPhoto}
        name={selected.recepientName}
        uniq={selected.recepientUniq}
        email={selected.recepientEmail}
        id={selected.recepientId}
        isGroupChat={!selected.recepientId}
        roomId={roomId}
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
