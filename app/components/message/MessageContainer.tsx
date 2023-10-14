"use client";

import React, { useState } from "react";
import MyChats from "./MyChats";
import CurrentChats from "./CurrentChats";
import { ChatType } from "@/types/Types";

type Props = {};

function MessageContainer({}: Props) {
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
        hide={hide}
        setHide={setHide}
        selected={selectedChat}
        showCurrent={showCurrent}
        setShowCurrent={setShowCurrent}
      />
    </div>
  );
}

export default MessageContainer;
