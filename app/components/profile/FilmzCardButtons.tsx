import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { BsChat } from "react-icons/bs";

type Props = {};

function FilmzCardButtons({}: Props) {
  return (
    <div className="flex justify-evenly ">
      <div className="flex text-sm text-gray-800 items-center">
        <BsChat /> 23
      </div>
      <div className="flex text-sm text-gray-800 items-center">
        <AiOutlineHeart /> 231
      </div>
      <div className="flex text-sm text-gray-800 items-center">
        <BiRepost /> 232
      </div>
    </div>
  );
}

export default FilmzCardButtons;
