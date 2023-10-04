"use client";
import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import FilmzCardButtons from "./FilmzCardButtons";
import { useAuth } from "@/auth/AuthState";
import Image from "next/image";
import { addDoc, collection, query, where } from "firebase/firestore";
import { db } from "@/auth/Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { filter } from "@/functions/profanityBlocker";
import { FirebaseUserType } from "@/types/Types";

type Props = {};

function FilmzCreator({}: Props) {
  const main = true;
  const loginUser: FirebaseUserType = useAuth();
  const [newPost, setNewPost] = useState("");
  const [scroll, setScroll] = useState(false);

  const filmzRef = collection(db, "filmz");

  const handleSubmit = async () => {
    if (newPost === "") return;
    const post = filter.clean(newPost);
    await addDoc(filmzRef, {
      text: post,
      sender: loginUser,
      senderId: loginUser.localId,
      createdAt: new Date(),
      likes: {},
    });
    console.log("DONE");

    setNewPost("");
  };
  const handleEnter = async (e: any) => {
    if (e === "Enter") {
      if (newPost === "") return;
      const post = filter.clean(newPost);
      await addDoc(filmzRef, {
        text: post,
        sender: loginUser,
        senderId: loginUser.localId,
        createdAt: new Date(),
        likes: {},
      });

      setNewPost("");
      setScroll(true);
    } else {
      return;
    }
  };

  return (
    <div className="w-full">
      <div
        className={`bg-black rounded-lg    p-2 flex  mx-4 my-2 ${
          main ? "w-full" : "w-[34rem]"
        }`}
      >
        <div className="  mt-1">
          {loginUser ? (
            <Image
              className="rounded-full hidden md:block"
              src={loginUser.photoUrl}
              alt="filmz photo"
              width={50}
              height={50}
            />
          ) : (
            <div className=""></div>
          )}
        </div>
        <div className=" ">
          <div className="flex pl-2">
            <div className="font-semibold">{loginUser?.displayName}</div>
            <div className="text-gray-800 text-sm ml-2">{loginUser?.email}</div>
          </div>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="rounded-lg bg-gray-950 border border-blue-400 col-span-8 outline-none w-[29rem] h-16  my-2 mx-1 p-2"
            placeholder="What's happening?"
          />
          <div onClick={() => handleSubmit()} className="flex ">
            <button className=" ml-auto bg-blue-400 flex justify-center rounded-full p-2 font-semibold w-[5.5rem] ">
              POST
            </button>
          </div>
        </div>
      </div>
      <hr className="border border-gray-800" />
    </div>
  );
}

export default FilmzCreator;