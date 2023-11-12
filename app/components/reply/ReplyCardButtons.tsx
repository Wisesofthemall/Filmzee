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

type Props = { likes: any; id: any };

function ReplyCardButtons({ likes, id }: Props) {
  const loginUser: FirebaseUserType = useAuth();
  const [liked, setLiked] = useState(false);
  const [docID, setDocID] = useState("");

  const replyCardRef = collection(db, "replies");
  const q = query(replyCardRef, where("createdAt", "==", id));
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
    const replyRef = doc(db, "replies", docID);
    if (num > 0) {
      setLiked(true);

      if (!isLiked) {
        likes[loginUser.localId] = loginUser.localId;
        updateDoc(replyRef, { likes: likes });
      }
    } else {
      setLiked(false);
      if (isLiked) {
        delete likes[loginUser.localId];
        updateDoc(replyRef, { likes: likes });
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
      <div className="flex text-sm text-gray-800 items-center font-bold">
        {liked ? (
          <div onClick={() => updateLike(-1)} className={`mx-1 text-rose-500 `}>
            <AiFillHeart size={20} />
          </div>
        ) : (
          <div
            onClick={() => updateLike(1)}
            className="mx-1 cursor-pointer hover:opacity-60 "
          >
            <AiOutlineHeart size={20} />
          </div>
        )}
        {Object.keys(likes).length}
      </div>
    </div>
  );
}

export default ReplyCardButtons;
