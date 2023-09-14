"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";
type Props = {};

function Search({}: Props) {
  return (
    <div className="bg-gray-500 rounded-lg w-80 grid grid-cols-10 p-1 mx-2">
      <input className="rounded-lg bg-gray-500 col-span-8 outline-none" />

      <div className="  col-span-2 border-l border-white flex justify-center items-center">
        <FaSearch />
      </div>
    </div>
  );
}

export default Search;
