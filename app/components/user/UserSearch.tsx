"use client";
import { Skeleton } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import SearchQuery from "./SearchQuery";
import { useAuth } from "@/auth/AuthState";
import { ChatType, UserType } from "@/types/Types";
import useCreateGroupChatModal from "@/app/hooks/useCreateGroupChat";

type Props = {
  getChat: (chat: ChatType[]) => {};
  loginInfo: UserType | null;
};

function UserSearch({ getChat, loginInfo }: Props) {
  const [username, setUsername] = useState<string>("");
  const [hide, setHide] = useState(true);
  const [query, setQuery] = useState("");
  const [apiQuery, setApiQuery] = useState("");
  const [typing, setTyping] = useState(false);
  const user = useAuth();
  const groupChat = useCreateGroupChatModal();

  //* This useEffect is use to check if the user stop typing for 1 second
  //* If so then make a query to the database
  //* This prevent over calling the database when the user isn't even finish typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length) {
        setApiQuery(query);
        setTyping(false);
        setHide(false);
      } else {
        setHide(true);
        setTyping(false);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setTyping(true);
  };

  useEffect(() => {
    if (user) {
      //* If user have a display name then store it
      if (user.displayName) {
        setUsername(user.displayName);

        //* Else create one by their email
      } else {
        const parsedName = user.email?.split("@")[0];
        setUsername(parsedName);
      }
    }
  }, [user]);

  return (
    <div className="z-50">
      <div className="bg-gray-300 rounded-lg grid grid-cols-10 w-full mb-4">
        <input
          onChange={(e) => handleOnChange(e)}
          className="rounded-lg bg-gray-300 col-span-8 outline-none p-1"
          placeholder="Search for Users by Email"
        />

        <div
          onClick={() => groupChat.onOpen()}
          className="  col-span-2 border-l border-white flex justify-center items-center cursor-pointer hover:opacity-60 font-bold"
        >
          <HiOutlineUserGroup size={26} />
        </div>
      </div>
      <div className="px-5">
        {typing ? (
          <div className="absolute">
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", bgcolor: "grey.400" }}
              width={300}
              height={50}
            />
          </div>
        ) : (
          <div className="w-45">
            {" "}
            <SearchQuery
              query={apiQuery}
              hide={hide}
              name={username}
              getChat={getChat}
              setHide={setHide}
              loginInfo={loginInfo}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSearch;
