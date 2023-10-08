"use client";

import { FirebaseUserType } from "@/types/Types";
import Image from "next/image";
import { Avatar } from "@mui/material";
import { colorMaker } from "@/functions/profileGenerator";
import { useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import DynamicPhoto from "../DynamicPhoto";
import Message from "./Message";
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
              <Message message={message} loginUser={loginUser} />
              <div className="flex justify-center items-center h-full mb-4">
                <DynamicPhoto
                  photoUrl={message.sender.photoUrl}
                  picId={parseInt(message.sender.createdAt.slice(-3))}
                  email={message.sender.email}
                />
              </div>
            </div>
          ) : (
            <div
              key={message.id}
              className="flex items-start justify-start m-2"
            >
              <DynamicPhoto
                photoUrl={message.sender.photoUrl}
                picId={parseInt(message.sender.createdAt.slice(-3))}
                email={message.sender.email}
              />
              <Message message={message} loginUser={loginUser} />
            </div>
          )}
        </div>
      ))}
      <span ref={dummy}></span>
    </div>
  );
}

export default Messages;
