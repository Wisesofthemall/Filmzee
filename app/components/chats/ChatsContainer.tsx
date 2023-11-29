"use client";
import React from "react";
import ChatsCard from "./ChatsCard";
import { memo } from "react";
import { ChatType } from "@/types/Types";

type Props = {
  myChats: ChatType[];
  setSelected: React.Dispatch<React.SetStateAction<ChatType>>;
  selected: ChatType;
  setShowCurrent: React.Dispatch<React.SetStateAction<boolean>>;
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatsContainer = memo(function ChatsContainer({
  myChats,
  setSelected,
  selected,
  setShowCurrent,
  setHide,
}: Props) {
  return (
    <div className="overflow-y-scroll overflow-x-hidden">
      {myChats.map((user: ChatType) => (
        <ChatsCard
          setHide={setHide}
          setShowCurrent={setShowCurrent}
          user={user}
          key={user.id}
          setSelected={setSelected}
          selected={selected}
        />
      ))}
    </div>
  );
});

export default ChatsContainer;
