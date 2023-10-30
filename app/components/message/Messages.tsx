"use client";

import { FirebaseUserType } from "@/types/Types";

import { useEffect, useRef } from "react";

import DynamicPhoto from "../DynamicPhoto";
import Message from "./Message";
import { useRouter } from "next/router";
type MessageType = {
  roomId: string;
  sender: FirebaseUserType;
  createdAt: string;
  text: string;
};
type Props = {
  messages: MessageType[];
  loginUser: FirebaseUserType;
  scroll: any;
  setScroll: any;
};

function Messages({ messages, loginUser, scroll, setScroll }: Props) {
  const router = useRouter();
  const dummy: any = useRef();
  const shouldScroll = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    shouldScroll();
    setScroll(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroll]);

  return (
    <div className="h-full overflow-y-scroll">
      {" "}
      {messages.map((message) => (
        <div key={message.createdAt} className="">
          {loginUser?.localId === message.sender.localId ? (
            <div
              key={message.createdAt}
              className="flex items-end justify-end m-2"
            >
              <Message message={message} loginUser={loginUser} />
              <div
                onClick={() =>
                  router.push(`/profile/${message.sender.localId}`)
                }
                className="flex justify-center items-center h-full mb-4 cursor-pointer hover:opacity-60"
              >
                <DynamicPhoto
                  photoUrl={message.sender.photoUrl}
                  picId={parseInt(message.sender.createdAt.slice(-3))}
                  email={message.sender.email}
                />
              </div>
            </div>
          ) : (
            <div
              key={message.createdAt}
              className="flex items-start justify-start m-2"
            >
              <div
                className="cursor-pointer hover:opacity-60"
                onClick={() =>
                  router.push(`/profile/${message.sender.localId}`)
                }
              >
                <DynamicPhoto
                  photoUrl={message.sender.photoUrl}
                  picId={parseInt(message.sender.createdAt.slice(-3))}
                  email={message.sender.email}
                />
              </div>
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
