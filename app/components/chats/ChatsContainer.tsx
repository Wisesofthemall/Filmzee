import React from "react";
import ChatsCard from "./ChatsCard";

type Props = {
  myChats: any;
};

function ChatsContainer({ myChats }: Props) {
  return (
    <div>
      {myChats.map((chat: any) => (
        <ChatsCard key={chat.id} />
      ))}
    </div>
  );
}

export default ChatsContainer;
