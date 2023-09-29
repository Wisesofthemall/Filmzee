"use client";

import React, { useState } from "react";
import MyChats from "./MyChats";
import CurrentChats from "./CurrentChats";
import { ChatType } from "@/types/Types";

type Props = {};

function MessageContainer({}: Props) {
  const test: ChatType = {
    created_at: "",
    id: NaN,
    recepientId: NaN,
    recepientEmail: "",
    recepientLocalID: "",
    recepientName: "Global Room 🧑‍🚀",
    recepientPhoto: "",
    recepientUniq: "",
    userId: "",
  };
  const [selectedChat, setSelectedChat] = useState(test);
  const [showCurrent, setShowCurrent] = useState(false);
  return (
    <div className="grid  grid-cols-10 w-full h-full p-1 md:p-9">
      <MyChats
        selected={selectedChat}
        setSelected={setSelectedChat}
        showCurrent={showCurrent}
        setShowCurrent={setShowCurrent}
      />
      <CurrentChats
        selected={selectedChat}
        showCurrent={showCurrent}
        setShowCurrent={setShowCurrent}
      />
    </div>
  );
}

export default MessageContainer;
