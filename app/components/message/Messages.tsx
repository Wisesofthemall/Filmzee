"use client";
import { FirebaseUserType, MessageType } from "@/types/Types";
import { useEffect, useRef } from "react";
import DynamicPhoto from "../DynamicPhoto";
import Message from "./Message";
import { useRouter } from "next/router";
import { HiDotsVertical } from "react-icons/hi";

type Props = {
  messages: MessageType[];
  loginUser: FirebaseUserType;
  scroll: boolean;
  setScroll: React.Dispatch<React.SetStateAction<boolean>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

function Messages({ messages, loginUser, scroll, setScroll, setImage }: Props) {
  const router = useRouter();
  const dummy: React.MutableRefObject<any> = useRef();
  const shouldScroll = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  //* Activate Auto Scrolling
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
              <Message
                message={message}
                loginUser={loginUser}
                setImage={setImage}
              />
              <div
                onClick={() =>
                  router.push(`/profile/${message.sender.localId}`)
                }
                className="flex justify-center items-center h-full pb-4 cursor-pointer hover:opacity-60 mt-auto "
              >
                <DynamicPhoto
                  photoUrl={message.sender.photoUrl}
                  picId={parseInt(message.sender.createdAt.slice(-3))}
                  email={message.sender.email}
                />
              </div>
              <div className="flex justify-center items-center">
                <HiDotsVertical />
              </div>
            </div>
          ) : (
            <div
              key={message.createdAt}
              className="flex items-start justify-start m-2"
            >
              <div
                className="cursor-pointer hover:opacity-60 pb-4 mt-auto"
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
              <Message
                message={message}
                loginUser={loginUser}
                setImage={setImage}
              />
            </div>
          )}
        </div>
      ))}
      <span ref={dummy}></span>
    </div>
  );
}

export default Messages;
