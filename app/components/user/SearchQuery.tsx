"use client";
import { getUsersByName } from "@/database/usersCRUD/Supabase";
import { ChatType, UserType } from "@/types/Types";
import React, { useEffect, useState } from "react";
import UserSearchCard from "./UserSearchCard";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  getChat: (chat: ChatType[]) => {};
  query: string;
  hide: boolean;
  name: string | undefined;
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
  loginInfo: UserType | null;
};

function SearchQuery({
  query,
  hide,
  name,
  getChat,
  setHide,
  loginInfo,
}: Props) {
  const [results, setResults] = useState<UserType[] | []>([]);
  const getResults = async () => {
    try {
      const users: UserType[] = await getUsersByName(query, name || "");
      setResults(users);
    } catch (error) {
      console.error("Error Fetching User Info", error);
    }
  };
  useEffect(() => {
    getResults();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <div
        onClick={() => setHide(true)}
        className={`float-right cursor-pointer hover:opacity-60 text-red-600 absolute left-[0.7rem]  ${
          hide ? "hidden" : "block"
        } mt-2`}
      >
        <AiOutlineClose size={20} />
      </div>
      <div
        className={`rounded-lg absolute bg-gray-950   ${
          hide ? "hidden" : "block"
        } overflow-y-scroll h-40`}
      >
        {results.map((u) => (
          <UserSearchCard
            user={u}
            key={u.id}
            getChat={getChat}
            loginInfo={loginInfo}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchQuery;
