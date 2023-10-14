"use client";
import { useAuth } from "@/auth/AuthState";
import { db } from "@/auth/Firebase";
import { FirebaseUserType } from "@/types/Types";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { BsChat } from "react-icons/bs";

type Props = { likes: any; id: any };

function FilmzCardButtons({ likes, id }: Props) {
  const loginUser: FirebaseUserType = useAuth();
  const [liked, setLiked] = useState(false);
  const [docID, setDocID] = useState("");

  const filmzCardRef = collection(db, "filmz");
  const q = query(filmzCardRef, where("createdAt", "==", id));
  const getDocName = async () => {
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const documentID = doc.id;

          setDocID(documentID);
        });
      })
      .catch((error) => {
        console.error("Error querying documents: ", error);
      });
  };

  const updateLike = (num: number) => {
    const isLiked = likes[loginUser.localId] ? true : false;
    const filmzRef = doc(db, "filmz", docID);
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
    getDocName();
    if (loginUser) {
      setLiked(likes[loginUser.localId] ? true : false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div
            onClick={() => updateLike(1)}
            className="mx-1 cursor-pointer hover:opacity-60"
          >
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
