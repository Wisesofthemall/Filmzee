"use client";
import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchQuery from "./SearchQuery";
import { AiOutlineClose } from "react-icons/ai";
type Props = {};

function UserSearch({}: Props) {
  const [hide, setHide] = useState(false);
  const [query, setQuery] = useState("");
  const [apiQuery, setApiQuery] = useState("");
  const [typing, setTyping] = useState(false);
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
          <SearchQuery query={apiQuery} hide={hide} />
        )}
      </div>
    </div>
  );
}

export default UserSearch;
