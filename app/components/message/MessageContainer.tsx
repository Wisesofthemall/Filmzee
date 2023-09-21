"use client";

import React, { useEffect, useState } from "react";
import MyChats from "./MyChats";
import CurrentChats from "./CurrentChats";

type Props = {};

function MessageContainer({}: Props) {
  const [selectedChat, setSelectedChat] = useState(false);
  return (
    <div className="grid  grid-cols-10 w-full h-full">
      <MyChats selected={selectedChat} />
      <CurrentChats selected={selectedChat} />
    </div>
  );
}

export default MessageContainer;
