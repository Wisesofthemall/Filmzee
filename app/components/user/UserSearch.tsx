"use client";
import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchQuery from "./SearchQuery";
import { AiOutlineClose } from "react-icons/ai";
import useAuth from "@/auth/AuthState";
import { UserType } from "@/types/Types";
type Props = {};

function UserSearch({}: Props) {
  const [username, setUsername] = useState<string>("");
  const [hide, setHide] = useState(false);
  const [query, setQuery] = useState("");
  const [apiQuery, setApiQuery] = useState("");
  const [typing, setTyping] = useState(false);
  const user = useAuth();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setApiQuery(query);
      setTyping(false);
      setHide(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleOnChange = (event: any) => {
    setQuery(event.target.value);
    setTyping(true);
  };

  useEffect(() => {
    if (user) {
      if (user.displayName) {
        setUsername(user.displayName);
      } else {
        const parsedName = user.email?.split("@")[0];
        setUsername(parsedName);
      }
    }
  }, [user]);

  return (
    <div className="">
      <div className="bg-gray-300 rounded-lg grid grid-cols-10 w-full">
        <input
          onChange={(e) => handleOnChange(e)}
          className="rounded-lg bg-gray-300 col-span-8 outline-none p-1"
          placeholder="Search for Users"
        />

        <div className="  col-span-2 border-l border-white flex justify-center items-center cursor-pointer">
          <FaSearch />
        </div>
      </div>
      <div className="px-5">
        <div
          onClick={() => setHide(true)}
          className={`float-right cursor-pointer ${hide ? "hidden" : "block"}`}
        >
          <AiOutlineClose />
        </div>
        {typing ? (
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem", bgcolor: "grey.400" }}
            width={300}
            height={50}
          />
        ) : (
          <SearchQuery query={apiQuery} hide={hide} name={username} />
        )}
      </div>
    </div>
  );
}

export default UserSearch;
