"use client";
import React from "react";

type Props = {
  selected: boolean;
};

function MyChats({ selected }: Props) {
  return (
    <div
      className={`bg-white text-black  col-span-3 md:block rounded-lg m-2 ${
        selected ? "" : ""
      } `}
    >
      MyChats
    </div>
  );
}

export default MyChats;
