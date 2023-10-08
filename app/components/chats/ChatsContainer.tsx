import React from "react";
import ChatsCard from "./ChatsCard";
import { memo } from "react";
type Props = {
  myChats: any;
  setSelected: any;
  selected: any;
  showCurrent: any;
  setShowCurrent: any;
  hide: any;
  setHide: any;
};

const ChatsContainer = memo(function ChatsContainer({
  myChats,
  setSelected,
  selected,
  showCurrent,
  setShowCurrent,
  hide,
  setHide,
}: Props) {
  return (
    <div className="overflow-y-scroll">
      {myChats.map((user: any) => (
        <ChatsCard
          hide={hide}
          setHide={setHide}
          showCurrent={showCurrent}
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
