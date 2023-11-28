"use client";
import React, { useEffect, useState } from "react";
import { collection, orderBy, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/auth/Firebase";
import ReplyCard from "./ReplyCard";

type Props = {
  main?: boolean;
  filmzId: any;
};

function ReplyContainer({ main, filmzId }: Props) {
  const [filmz, setFilmz] = useState<any>([]);
  const filmzRef = collection(db, "replies");

  //* query that get all the comments associated with the filmz
  const queryRef = filmzId
    ? query(filmzRef, where("filmzId", "==", filmzId))
    : query(filmzRef, orderBy("createdAt", "desc"));

  const [Posts] = useCollectionData(queryRef);

  //* Simply sort the comment base on when it was created
  useEffect(() => {
    if (Posts) {
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
  }, [Posts]);

  return (
    <div className={`w-full h-2/5 flex flex-wrap mt-3  `}>
      {filmz.map((post: any) => (
        <ReplyCard key={post.createdAt} main={main} post={post} />
      ))}
    </div>
  );
}

export default ReplyContainer;
