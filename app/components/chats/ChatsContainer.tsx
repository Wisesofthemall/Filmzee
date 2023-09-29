import React from "react";
import ChatsCard from "./ChatsCard";

type Props = {
  myChats: any;
  setSelected: any;
  selected: any;
};

function ChatsContainer({ myChats, setSelected, selected }: Props) {
  return (
    <div>
      {myChats.map((user: any) => (
        <ChatsCard
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
