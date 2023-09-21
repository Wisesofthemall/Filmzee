"use client";
import React from "react";

type Props = {
  selected: boolean;
};

function CurrentChats({ selected }: Props) {
  return (
    <div
      className={`bg-gray-600 md:col-span-7 md:block rounded-lg m-2 ${
        selected ? "" : ""
      }`}
    >
      CurrentChats
    </div>
  );
}

export default CurrentChats;
