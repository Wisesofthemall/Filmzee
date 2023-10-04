"use client";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { BsChat } from "react-icons/bs";

type Props = {};

function FilmzCardButtons({}: Props) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex justify-evenly ">
      <div className="flex text-sm text-gray-800 items-center">
        <div className="mx-1">
          <BsChat size={20} />
        </div>{" "}
        0
      </div>
      <div className="flex text-sm text-gray-800 items-center">
        {liked ? (
          <div
            onClick={() => setLiked(!liked)}
            className={`mx-1 text-rose-500 `}
          >
            <AiFillHeart size={20} />
          </div>
        ) : (
          <div onClick={() => setLiked(!liked)} className="mx-1">
            <AiOutlineHeart size={20} />
          </div>
        )}
        0
      </div>
      <div className="flex text-sm text-gray-800 items-center">
        <div className="mx-1">
          <BiRepost size={20} />
        </div>{" "}
        0
      </div>
    </div>
  );
}

export default FilmzCardButtons;
