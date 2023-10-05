"use client";

import { FirebaseUserType } from "@/types/Types";
import Image from "next/image";
import { Avatar } from "@mui/material";
import { colorMaker } from "@/functions/profileGenerator";
import { useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
type Props = {
  messages: any;
  loginUser: FirebaseUserType;
  scroll: any;
  setScroll: any;
};

function Messages({ messages, loginUser, scroll, setScroll }: Props) {
  const dummy: any = useRef();
  const shouldScroll = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (scroll) {
      shouldScroll();
      setScroll(false);
    }
  }, [scroll, setScroll]);

  return (
    <div className="h-full overflow-y-scroll">
      {" "}
      {messages.map((message: any) => (
        <div key={message.id} className="">
          {loginUser?.localId === message.sender.localId ? (
            <div key={message.id} className="flex items-end justify-end m-2">
              <div className="">
                <div className="rounded-lg p-2 bg-blue-950 mr-1 text-end">
                  {message.text}
                </div>
                <div className="text-xs text-blue-400 px-2 text-end">
                  {formatDistanceToNow(message.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              {message.sender.photoUrl ? (
                <Image
                  className="rounded-full "
                  src={message.sender.photoUrl}
                  alt="profile image"
                  width={40}
                  height={40}
                />
              ) : (
                <Avatar
                  sx={{
                    bgcolor: colorMaker(
                      parseInt(message.sender.createdAt.slice(-3)),
                    ),
                  }}
                >
                  {message.sender.email[0].toUpperCase()}
                </Avatar>
              )}
            </div>
          ) : (
            <div
              key={message.id}
              className="flex items-start justify-start m-2"
            >
              {message.sender.photoUrl ? (
                <Image
                  className="rounded-full "
                  src={message.sender.photoUrl}
                  alt="receiver image"
                  width={40}
                  height={40}
                />
              ) : (
                <Avatar
                  sx={{
                    bgcolor: colorMaker(
                      parseInt(message.sender.createdAt.slice(-3)),
                    ),
                  }}
                >
                  {message.sender.email[0].toUpperCase()}
                </Avatar>
              )}
              <div className="">
                <div className="rounded-lg p-2 bg-blue-950 ml-1">
                  {message.text}
                </div>
                <div className="ml-auto text-xs text-blue-400 px-2">
                  {formatDistanceToNow(message.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <span ref={dummy}></span>
    </div>
  );
}

export default Messages;
