"use client";
import React, { useEffect, useState } from "react";
import FilmzCard from "./FilmzCard";
import FilmzCreator from "./FilmzCreator";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/auth/Firebase";

type Props = {
  main?: boolean;
  senderId?: string;
};

function FilmzContainer({ main, senderId }: Props) {
  const [scroll, setScroll] = useState(false);

  const filmzRef = collection(db, "filmz");
  const queryRef = senderId
    ? query(filmzRef, where("senderId", "==", senderId))
    : query(filmzRef);
  const [filmz, setFilmz] = useState<any[]>([]);

  const [Posts] = useCollectionData(queryRef);
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
      setScroll(true);
    }
  }, [Posts]);
  return (
    <div
      className={`w-full   flex flex-wrap pb-28 mt-3 overflow-y-scroll overflow-x-hidden ${
        main ? "" : "pl-[15rem]"
      } ${main ? "" : "//h-[52vh] h-max"}  ${main ? "" : "justify-center"}`}
    >
      {main && <FilmzCreator />}

      {filmz.map((post) => (
        <FilmzCard key={post.createdAt} main={main} post={post} />
      ))}
    </div>
  );
}

export default FilmzContainer;
