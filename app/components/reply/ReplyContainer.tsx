"use client";
import React, { useEffect, useState } from "react";
import FilmzCard from "../filmz/FilmzCard";
import FilmzCreator from "../filmz/FilmzCreator";
import { collection, orderBy, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/auth/Firebase";
import ReplyCard from "./ReplyCard";

type Props = {
  main?: boolean;
  senderId?: string;
  filmzId: any;
  setFilmzId: any;
};

function ReplyContainer({ main, senderId, filmzId, setFilmzId }: Props) {
  const filmzRef = collection(db, "replies");
  const queryRef = filmzId
    ? query(filmzRef, where("filmzId", "==", filmzId))
    : query(filmzRef, orderBy("createdAt", "desc"));
  const [filmz, setFilmz] = useState<any>([]);

  const [Posts] = useCollectionData(queryRef);
  useEffect(() => {
    if (Posts && senderId) {
      const filterMessage = Posts.sort(function (a, b) {
        // Convert Firestore Timestamps to JavaScript Date objects

        const dateA = a.createdAt;
        const dateB = b.createdAt;

        // Compare the Date objects to sort in ascending order
        return dateB - dateA;
      });

      setFilmz(filterMessage);
    } else if (Posts) {
      setFilmz(Posts);
    }
  }, [Posts, senderId]);

  return (
    <div className={`w-full h-2/5 flex flex-wrap mt-3  `}>
      {filmz.map((post: any) => (
        <ReplyCard
          key={post.createdAt}
          main={main}
          post={post}
          filmzId={filmzId}
          setFilmzId={setFilmzId}
        />
      ))}
    </div>
  );
}

export default ReplyContainer;
