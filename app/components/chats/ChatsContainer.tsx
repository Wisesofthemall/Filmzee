import React from "react";
import ChatsCard from "./ChatsCard";

type Props = {
  myChats: any;
  setSelected: any;
  selected: any;
  showCurrent: any;
  setShowCurrent: any;
};

function ChatsContainer({
  myChats,
  setSelected,
  selected,
  showCurrent,
  setShowCurrent,
}: Props) {
  return (
    <div>
      {myChats.map((user: any) => (
        <ChatsCard
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
}

export default ChatsContainer;
