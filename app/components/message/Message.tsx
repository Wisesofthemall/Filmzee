import { formatDistanceToNow } from "date-fns";
import React from "react";
import DynamicPhoto from "../DynamicPhoto";

type Props = { message: any; loginUser: any };

function Message({ message, loginUser }: Props) {
  return (
    <div className="">
      <div
        className={`${
          loginUser?.localId === message.sender.localId ? "ml-auto" : "mx-1"
        } w-fit `}
      >
        <div className="rounded-lg p-2 bg-blue-950 mr-1 text-end">
          {message.text}
        </div>
      </div>
      <div className="text-xs text-blue-400 px-2 text-end">
        {formatDistanceToNow(message.createdAt.toDate(), {
          addSuffix: true,
        })}
      </div>
    </div>
  );
}

export default Message;
