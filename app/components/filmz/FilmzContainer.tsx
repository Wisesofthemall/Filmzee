"use client";
import React, { useEffect, useState } from "react";
import FilmzCard from "./FilmzCard";
import FilmzCreator from "./FilmzCreator";
import { collection, orderBy, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/auth/Firebase";
import { FilmzType } from "@/types/Types";

type Props = {
  main?: boolean;
  senderId?: string;
  setFilmzId: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

function FilmzContainer({ main, senderId, setFilmzId, setImage }: Props) {
  const filmzRef = collection(db, "filmz");
  const queryRef = senderId
    ? query(filmzRef, where("senderId", "==", senderId))
    : query(filmzRef, orderBy("createdAt", "desc"));
  const [filmz, setFilmz] = useState<FilmzType[]>([]);

  const [Posts] = useCollectionData(queryRef);
  useEffect(() => {
    //* if you're in the /profile page then sort and set state
    if (Posts && senderId) {
      const sortedMessage = Posts.sort(function (a, b) {
        const dateA = a.createdAt;
        const dateB = b.createdAt;
        return dateB - dateA;
      });

      setFilmz(sortedMessage as FilmzType[]);
    } else if (Posts) {
      //* else you're in the main page then set state
      setFilmz(Posts as FilmzType[]);
    }
  }, [Posts, senderId]);

  return (
    <div
      className={`w-full  p-3 flex flex-wrap pb-28 mt-3 overflow-y-scroll overflow-x-hidden ${
        main ? "" : " pl-0 md:pl-[15rem]"
      } ${main ? "" : " h-[52vh] overflow-y-scroll"}  `}
    >
      {main && <FilmzCreator />}

      {filmz.map((post: FilmzType) => (
        <FilmzCard
          key={post.createdAt}
          main={main}
          post={post}
          setFilmzId={setFilmzId}
          setImage={setImage}
        />
      ))}
    </div>
  );
}

export default FilmzContainer;
