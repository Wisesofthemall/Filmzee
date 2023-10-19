import React from "react";
import ChatsCard from "./ChatsCard";
import { memo } from "react";
type Props = {
  myChats: any;
  setSelected: any;
  selected: any;

  setShowCurrent: any;

  setHide: any;
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
      {myChats.map((user: any) => (
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
