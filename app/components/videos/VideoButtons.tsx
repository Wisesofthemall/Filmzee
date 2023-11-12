"use client";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { BsChat } from "react-icons/bs";

type Props = {
  changeIndex: (value: number) => void;
  index: number;
  endIndex: number;
};

function VideoButtons({ changeIndex, index, endIndex }: Props) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="grid  items-center">
      {index !== 0 && (
        <div onClick={() => changeIndex(-1)} className="hover:text-blue-500">
          <BiUpArrow size={50} />
        </div>
      )}
      {liked ? (
        <div className="mx-1 text-rose-500 text-center">
          <AiFillHeart size={50} />
          1293
        </div>
      ) : (
        <div className="mx-1  text-center">
          <AiOutlineHeart size={50} />
          1293
        </div>
      )}

      <div className="text-center">
        <BsChat size={50} />
        34
      </div>
      {endIndex !== index && (
        <div onClick={() => changeIndex(1)} className="hover:text-blue-500">
          <BiDownArrow size={50} />
        </div>
      )}
    </div>
  );
}

export default VideoButtons;
