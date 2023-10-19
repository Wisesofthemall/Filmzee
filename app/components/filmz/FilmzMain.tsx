"use client";
import React, { useEffect, useState } from "react";
import DynamicPhoto from "../DynamicPhoto";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/auth/Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import FilmzCardButtons from "./FilmzCardButtons";
import { Menu, MenuButton } from "@chakra-ui/react";
import FilmzMenu from "./FilmzMenu";

type Props = { filmzId: any; setFilmzId: any };

function FilmzMain({ filmzId, setFilmzId }: Props) {
  const [main, setMain] = useState<any>(null);

  const filmzRef = collection(db, "filmz");

  const queryRef = query(filmzRef, where("id", "==", filmzId));

  const [Post] = useCollectionData(queryRef);

  useEffect(() => {
    if (Post && Post.length > 0) {
      setMain(Post[0]);
    }
  }, [Post]);

  const formattedTimeDifference = main
    ? formatDistanceToNow(main.createdAt.toDate(), {
        addSuffix: true,
        includeSeconds: true,
      })
    : "";

  return (
    <div className={`${main ? "w-full" : "w-full m-2"}`}>
      <div
        className={`bg-black rounded-lg  p-2 flex "w-full"
    `}
      >
        <div className=" ml-2 mt-1 cursor-pointer hover:opacity-60">
          {main && (
            <DynamicPhoto
              photoUrl={main?.sender.photoUrl}
              email={main?.sender.email}
              picId={parseInt(main?.sender.createdAt.slice(-3))}
              size={100}
            />
          )}
        </div>
        <div className="w-full h-full ">
          <div className="flex pl-2">
            <div className="font-semibold cursor-pointer hover:opacity-60 sm:text-sm md:text-2xl lg:text-3xl">
              {main?.sender.displayName
                ? main?.sender.displayName
                : main?.sender.email.split("@")[0]}
            </div>
            <div className="text-gray-800  ml-2 cursor-pointer hover:opacity-60 sm:text-sm md:text-2xl lg:text-3xl">
              {main?.sender.email}
            </div>
            <div className="flex pl-20 justify-end ml-auto">
              <div className="text-gray-800  hidden md:block sm:text-sm md:text-2xl lg:text-3xl">
                {formattedTimeDifference}
              </div>
              <div className="text-gray-800 text-sm items-center"></div>
            </div>
          </div>
          <p className=" p-2 w-full flex flex-wrap overflow-wrap break-word sm:text-sm md:text-2xl lg:text-3xl">
            {main?.text}
          </p>
          {main?.image && (
            <div className="my-2 flex justify-center">
              <Image
                alt="filmz image"
                className="w-3/5 h-3/5 rounded-lg"
                src={main.image}
                width={130}
                height={130}
              />
            </div>
          )}
          <FilmzCardButtons
            likes={main?.likes}
            id={main?.createdAt}
            filmzId={filmzId}
            setFilmzId={setFilmzId}
            disabled
          />
        </div>
      </div>
      <hr className="border border-gray-800" />
    </div>
  );
}

export default FilmzMain;
