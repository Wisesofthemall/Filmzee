"use client";
import React from "react";

type Props = {
  selected: boolean;
};

function CurrentChats({ selected }: Props) {
  return (
    <div
      className={`bg-gray-600 col-span-7  rounded-lg m-2 ${selected ? "" : ""}`}
    >
      CurrentChats
    </div>
  );
}

export default CurrentChats;
