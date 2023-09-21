"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
type Props = {};

function Search({}: Props) {
  return (
    <div className="bg-gray-500 rounded-lg grid grid-cols-10 p-1 mx-2  w-50 md:w-80 lg:w-[26rem]">
      <input className="rounded-lg bg-gray-500 col-span-8 outline-none" />
      <div className="  col-span-2 border-l border-white flex justify-center items-center cursor-pointer">
        <FaSearch />
      </div>
    </div>
  );
}

export default Search;
