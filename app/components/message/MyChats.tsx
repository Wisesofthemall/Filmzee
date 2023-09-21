"use client";
import React from "react";
import Search from "../Search";
import UserSearch from "../user/UserSearch";

type Props = {
  selected: boolean;
};

function MyChats({ selected }: Props) {
  return (
    <div
      className={`bg-white text-black  col-span-3 md:block rounded-lg m-2 p-3 ${
        selected ? "" : ""
      } `}
    >
      <UserSearch />
    </div>
  );
}

export default MyChats;
