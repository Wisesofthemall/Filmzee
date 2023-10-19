"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@/auth/AuthState";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/auth/Firebase";

import { filter } from "@/functions/profanityBlocker";
import { FirebaseUserType } from "@/types/Types";
import useSignupModal from "@/app/hooks/useSignupModal";
import DynamicPhoto from "../DynamicPhoto";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
import { useRouter } from "next/navigation";

import FilmzImageUploader from "../filmz/FilmzImageUploader";
import FilmzImageRender from "../filmz/FilmzImageRender";
import { v4 as uuidv4 } from "uuid";

type Props = { filmzId: any };

function ReplyCreator({ filmzId }: Props) {
  const [userInfo, setUserInfo] = useState<any>({});
  const [filmzPhoto, setFilmzPhoto] = useState<any>(null);
  const router = useRouter();
  const main = true;
  const loginUser: FirebaseUserType = useAuth();

  const [newPost, setNewPost] = useState("");
  const signupModal = useSignupModal();

  const filmzRef = collection(db, "replies");

  const handleSubmit = async () => {
    if (!loginUser) {
      signupModal.onOpen();
      return;
    }
    if (newPost === "") return;
    const post = filter.clean(newPost);

    await addDoc(filmzRef, {
      id: uuidv4(),
      filmzId: filmzId,
      senderId: loginUser.localId,
      text: post,
      image: filmzPhoto,
      sender: {
        ...loginUser,
        displayName: userInfo.name,
        photoUrl: userInfo.photoUrl,
      },
      createdAt: new Date(),
      likes: {},
      comments: 0,
    });

    setNewPost("");
    setFilmzPhoto(null);
  };
  const getInfo = async () => {
    const result = await getUserByLocalId(loginUser.localId);

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
        id: uuidv4(),
        filmzId: filmzId,
        senderId: loginUser.localId,
        text: post,
        image: filmzPhoto,
        sender: {
          ...loginUser,
          displayName: userInfo.name,
          photoUrl: userInfo.photoUrl,
        },
        createdAt: new Date(),
        likes: {},
        comments: 0,
      });

      setNewPost("");
      setFilmzPhoto(null);
    } else {
      return;
    }
  };

  return (
    <div className="w-full sticky bottom-0">
      <div
        className={`bg-black rounded-lg    p-2 flex ${
          main ? "w-full" : "w-full"
        }`}
      >
        <div
          className="  mt-1 cursor-pointer hover:opacity-60"
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
            <div className="font-semibold">
              {userInfo ? userInfo.name : undefined}
            </div>
            <div className="text-gray-800 text-sm ml-2">{loginUser?.email}</div>
          </div>
          <textarea
            onKeyDown={(e) => handleEnter(e.key)}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="rounded-lg bg-gray-950 border border-blue-400 col-span-8 outline-none w-4/5 h-16  my-2 mx-1 p-2"
            placeholder={"Post your reply"}
          />
          {filmzPhoto && (
            <FilmzImageRender
              photo={filmzPhoto}
              deletePhoto={() => setFilmzPhoto(null)}
            />
          )}
          <div className="px-3">
            <div className="flex justify-between">
              <div className="flex items-center justify-items-center cursor-pointer ">
                <FilmzImageUploader
                  value={filmzPhoto}
                  onChange={setFilmzPhoto}
                />
              </div>
              <div onClick={() => handleSubmit()} className="flex ">
                <button className=" ml-auto bg-blue-400 flex justify-center rounded-full p-2 font-semibold w-[5.5rem] hover:opacity-60">
                  POST
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplyCreator;
