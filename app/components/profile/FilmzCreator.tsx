"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@/auth/AuthState";
import Image from "next/image";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/auth/Firebase";

import { filter } from "@/functions/profanityBlocker";
import { FirebaseUserType, UserType } from "@/types/Types";
import useSignupModal from "@/app/hooks/useSignupModal";
import DynamicPhoto from "../DynamicPhoto";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
import { useRouter } from "next/navigation";

import { IoImageOutline } from "react-icons/io5";

type Props = {};

function FilmzCreator({}: Props) {
  const [userInfo, setUserInfo] = useState<any>({});
  const router = useRouter();
  const main = true;
  const loginUser: FirebaseUserType = useAuth();

  const [newPost, setNewPost] = useState("");
  const signupModal = useSignupModal();

  const filmzRef = collection(db, "filmz");

  const handleSubmit = async () => {
    if (!loginUser) {
      signupModal.onOpen();
      return;
    }
    if (newPost === "") return;
    const post = filter.clean(newPost);
    console.log(userInfo.photoUrl);
    await addDoc(filmzRef, {
      text: post,
      sender: {
        ...loginUser,
        displayName: userInfo.name,
        photoUrl: userInfo.photoUrl,
      },
      senderId: loginUser.localId,
      createdAt: new Date(),
      likes: {},
      images: ["som", "some"],
    });

    setNewPost("");
  };
  const getInfo = async () => {
    const result = await getUserByLocalId(loginUser.localId);
    console.log(result);
    setUserInfo(result);
  };

  useEffect(() => {
    if (loginUser) {
      getInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser]);

  const handleEnter = async (e: any) => {
    if (e === "Enter") {
      if (newPost === "") return;
      const post = filter.clean(newPost);
      await addDoc(filmzRef, {
        text: post,
        sender: {
          ...loginUser,
          displayName: userInfo.name,
          photoUrl: userInfo.photoUrl,
        },
        senderId: loginUser.localId,
        createdAt: new Date(),
        likes: {},
      });

      setNewPost("");
    } else {
      return;
    }
  };

  return (
    <div className="w-full">
      <div
        className={`bg-black rounded-lg    p-2 flex  mx-4 my-2 ${
          main ? "w-full" : "w-full"
        }`}
      >
        <div
          className="  mt-1 cursor-pointer"
          onClick={() => router.push(`/profile/${userInfo.localId}`)}
        >
          <DynamicPhoto
            photoUrl={userInfo ? userInfo.photoUrl : undefined}
            picId={
              loginUser ? parseInt(loginUser?.createdAt.slice(-3)) : undefined
            }
            email={loginUser ? loginUser.email : undefined}
          />
        </div>
        <div className="w-full">
          <div className="flex pl-2">
            <div className="font-semibold">{loginUser?.displayName}</div>
            <div className="text-gray-800 text-sm ml-2">{loginUser?.email}</div>
          </div>
          <textarea
            onKeyDown={(e) => handleEnter(e.key)}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="rounded-lg bg-gray-950 border border-blue-400 col-span-8 outline-none w-4/5 h-16  my-2 mx-1 p-2"
            placeholder="What's happening?"
          />
          <div className="px-3">
            <div className="flex justify-between">
              <div className="flex items-center justify-items-center cursor-pointer">
                <IoImageOutline size={30} />
              </div>
              <div onClick={() => handleSubmit()} className="flex ">
                <button className=" ml-auto bg-blue-400 flex justify-center rounded-full p-2 font-semibold w-[5.5rem] ">
                  POST
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border border-gray-800" />
    </div>
  );
}

export default FilmzCreator;
