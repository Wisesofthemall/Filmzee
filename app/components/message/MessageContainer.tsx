"use client";
import React, { useState } from "react";
import MyChats from "../chats/MyChats";
import CurrentChats from "../chats/CurrentChats";
import { ChatType } from "@/types/Types";

type Props = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

function MessageContainer({ setImage }: Props) {
  const test: ChatType = {
    show: false,
    created_at: "",
    id: NaN,
    recepientId: NaN,
    recepientEmail: "",
    recepientLocalID: "",
    recepientName: "Global Room 🧑‍🚀",
    recepientPhoto: "",
    recepientUniq: "",
    userId: "",
    roomId: "q",
  };
  const [selectedChat, setSelectedChat] = useState(test);
  const [showCurrent, setShowCurrent] = useState(false);
  const [hide, setHide] = useState(true);
  return (
    <div className="grid  grid-cols-10 w-full h-full p-1  overflow-y-scroll">
      <MyChats
        hide={hide}
        setHide={setHide}
        selected={selectedChat}
        setSelected={setSelectedChat}
        showCurrent={showCurrent}
        setShowCurrent={setShowCurrent}
      />
      <CurrentChats
        setImage={setImage}
        hide={hide}
        selected={selectedChat}
        showCurrent={showCurrent}
        setShowCurrent={setShowCurrent}
      />
    </div>
  );
}

export default MessageContainer;
