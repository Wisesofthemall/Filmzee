"use client";

import React, { useEffect, useState } from "react";
import MyChats from "./MyChats";
import CurrentChats from "./CurrentChats";
import { ChatType } from "@/types/Types";
import { stringify } from "querystring";

type Props = {};

function MessageContainer({}: Props) {
  const test: ChatType = {
    created_at: "",
    id: NaN,
    recepientId: NaN,
    recepientEmail: "",
    recepientLocalID: "",
    recepientName: "LonleyRoom 🧑‍🚀",
    recepientPhoto: "",
    recepientUniq: "",
    userId: "",
  };
  const [selectedChat, setSelectedChat] = useState(test);
  return (
    <div className="grid  grid-cols-10 w-full h-full p-9">
      <MyChats selected={selectedChat} setSelected={setSelectedChat} />
      <CurrentChats selected={selectedChat} />
    </div>
  );
}

export default MessageContainer;
