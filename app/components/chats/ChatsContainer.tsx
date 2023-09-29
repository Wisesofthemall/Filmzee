import React from "react";
import ChatsCard from "./ChatsCard";

type Props = {
  myChats: any;
};

function ChatsContainer({ myChats }: Props) {
  return (
    <div>
      {myChats.map((user: any) => (
        <ChatsCard user={user} key={user.id} />
      ))}
    </div>
  );
}

export default ChatsContainer;
