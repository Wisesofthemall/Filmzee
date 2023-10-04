"use client";
import { useAuth } from "@/auth/AuthState";
import { db } from "@/auth/Firebase";
import { FirebaseUserType } from "@/types/Types";
import { collection, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { BsChat } from "react-icons/bs";

type Props = { likes: any };

function FilmzCardButtons({ likes }: Props) {
  const loginUser: FirebaseUserType = useAuth();
  const [liked, setLiked] = useState(false);
  const filmzRef = doc(db, "filmz", "0tRwtQneugK2mF3bm4Bt");

  const updateLike = (num: number) => {
    const isLiked = likes[loginUser.localId] ? true : false;
    if (num > 0) {
      setLiked(true);

      if (!isLiked) {
        likes[loginUser.localId] = loginUser.localId;
        updateDoc(filmzRef, { likes: likes });
      }
    } else {
      setLiked(false);
      if (isLiked) {
        delete likes[loginUser.localId];
        updateDoc(filmzRef, { likes: likes });
      }
    }
  };
  useEffect(() => {
    if (loginUser) {
      setLiked(likes[loginUser.localId] ? true : false);
    }
  }, [loginUser, likes]);

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
          <div onClick={() => updateLike(-1)} className={`mx-1 text-rose-500 `}>
            <AiFillHeart size={20} />
          </div>
        ) : (
          <div onClick={() => updateLike(1)} className="mx-1">
            <AiOutlineHeart size={20} />
          </div>
        )}
        {Object.keys(likes).length}
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
