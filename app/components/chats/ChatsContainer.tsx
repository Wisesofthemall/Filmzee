import React from "react";
import ChatsCard from "./ChatsCard";

type Props = {
  myChats: any;
  setSelected: any;
};

function ChatsContainer({ myChats, setSelected }: Props) {
  return (
    <div>
      {myChats.map((user: any) => (
        <ChatsCard user={user} key={user.id} setSelected={setSelected} />
      ))}
    </div>
  );
}

export default ChatsContainer;
