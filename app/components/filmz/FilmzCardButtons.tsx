"use client";
import useCommentModal from "@/app/hooks/useCommentModal";
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
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";

type Props = {
  likes: { [key: string]: string };
  id: string;
  filmzId: string;
  setFilmzId: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
};

function FilmzCardButtons({ likes, id, filmzId, setFilmzId, disabled }: Props) {
  const loginUser: FirebaseUserType = useAuth();
  const [liked, setLiked] = useState(false);
  const [docID, setDocID] = useState("");
  const commentModal = useCommentModal();

  const filmzRef = collection(db, "replies");
  const queryRef = query(filmzRef, where("filmzId", "==", filmzId));

  const [Posts] = useCollectionData(queryRef);

  const filmzCardRef = collection(db, "filmz");
  const q = id
    ? query(filmzCardRef, where("createdAt", "==", id))
    : query(filmzCardRef, where("createdAt", "==", new Date()));

  //* Get the Document ID of the current Filmz and store it in a state
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

  //* Update the current like status of the current Filmz
  const updateLike = (num: number) => {
    //* Did the login user already like the filmz ?
    const isLiked = likes[loginUser.localId] ? true : false;
    const filmzRef = doc(db, "filmz", docID);
    //* Turns the heart icon red
    if (num > 0) {
      setLiked(true);

      //* If login users didn't like then add the user to the like object
      if (!isLiked) {
        likes[loginUser.localId] = loginUser.localId;
        //* Update the filmz like status
        updateDoc(filmzRef, { likes: likes });
      }
    } else {
      //* Turns the heart icon blank
      setLiked(false);
      if (isLiked) {
        //* If login users already like then remove the user from the like object
        delete likes[loginUser.localId];
        //* Update the filmz like status
        updateDoc(filmzRef, { likes: likes });
      }
    }
  };

  //* Opens the Modal that contains the Comment Section
  const setComments = () => {
    if (disabled) {
      return;
    }
    setFilmzId(filmzId);
    commentModal.onOpen();
  };
  //* Get the Document ID and check if user liked the filmz already
  useEffect(() => {
    getDocName();
    if (loginUser && likes) {
      setLiked(likes[loginUser.localId] ? true : false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser, likes]);

  return (
    <div className="flex justify-evenly ">
      <div
        onClick={() => setComments()}
        className="flex text-sm text-gray-800 items-center font-bold hover:text-blue-400  cursor-pointer"
      >
        <div className="mx-1 ">
          <BsChat size={20} />
        </div>{" "}
        {Posts?.length}
      </div>
      <div className="flex text-sm text-gray-800 items-center font-bold ">
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
        {likes && Object.keys(likes).length}
      </div>
    </div>
  );
}

export default FilmzCardButtons;
