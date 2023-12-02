"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/auth/AuthState";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/auth/Firebase";
import { filter } from "@/functions/profanityBlocker";
import { FirebaseUserType, UserType } from "@/types/Types";
import useSignupModal from "@/app/hooks/useSignupModal";
import DynamicPhoto from "../DynamicPhoto";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
import { useRouter } from "next/navigation";
import FilmzImageUploader from "./FilmzImageUploader";
import FilmzImageRender from "./FilmzImageRender";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

type Props = {};

function FilmzCreator({}: Props) {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [filmzPhoto, setFilmzPhoto] = useState<string | null>(null);
  const router = useRouter();
  const main = true;
  const loginUser: FirebaseUserType = useAuth();

  const [newPost, setNewPost] = useState("");
  const signupModal = useSignupModal();

  const filmzRef = collection(db, "filmz");

  const handleSubmit = async () => {
    //* Check if user is authorized , if not then show sign up modal
    if (!loginUser) {
      signupModal.onOpen();
      return;
    }
    //* Check if theres any content to be sent
    if (newPost === "" && !filmzPhoto) {
      toast.error("Please add a text or image");
      return;
    }
    //* Filter out any curse words the user may have text
    const post = newPost.length !== 0 ? filter.clean(newPost) : null;
    //* Add Filmz to our database
    try {
      await addDoc(filmzRef, {
        id: uuidv4(),
        senderId: loginUser.localId,
        text: post,
        image: filmzPhoto,
        sender: {
          ...loginUser,
          displayName: userInfo?.name,
          photoUrl: userInfo?.photoUrl,
        },
        createdAt: new Date(),
        likes: {},
      });
    } catch (error) {
      console.error("Error Adding Filmz to Database", error);
    } finally {
      //* Reset Filmz State
      setNewPost("");
      setFilmzPhoto(null);
    }
  };
  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    //* Check is user press the 'Enter' Key
    if (e.key === "Enter") {
      //* Check if user is authorized , if not then show sign up modal
      if (!loginUser) {
        signupModal.onOpen();
        return;
      }
      //* Check if theres any content to be sent
      if (newPost === "" && !filmzPhoto) {
        toast.error("Please add a text or image");
        return;
      }
      //* Filter out any curse words the user may have text
      const post = newPost.length !== 0 ? filter.clean(newPost) : null;
      //* Add Filmz to our database
      try {
        await addDoc(filmzRef, {
          id: uuidv4(),
          senderId: loginUser.localId,
          text: post,
          image: filmzPhoto,
          sender: {
            ...loginUser,
            displayName: userInfo?.name,
            photoUrl: userInfo?.photoUrl,
          },
          createdAt: new Date(),
          likes: {},
        });
      } catch (error) {
        console.error("Error Adding Filmz to Database", error);
      } finally {
        //* Reset Filmz State
        setNewPost("");
        setFilmzPhoto(null);
      }
    } else {
      return;
    }
  };

  //* Get login user's info and store it in a state
  const getInfo = async () => {
    try {
      const result = await getUserByLocalId(loginUser.localId);
      setUserInfo(result);
    } catch (error) {
      console.error("Error fetching user info", error);
    }
  };

  //* Fetch login user info or reset state
  useEffect(() => {
    if (loginUser) {
      getInfo();
    } else {
      setUserInfo(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser]);

  return (
    <div className="w-full">
      <div
        className={`bg-black rounded-lg    p-2 flex  mx-4 my-2 ${
          main ? "w-full" : "w-full"
        }`}
      >
        <div
          className="  mt-1 cursor-pointer hover:opacity-60"
          onClick={() => router.push(`/profile/${userInfo?.localId}`)}
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
            onKeyDown={(e) =>
              handleEnter(e as unknown as React.KeyboardEvent<HTMLInputElement>)
            }
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="rounded-lg bg-gray-950 border border-blue-400 col-span-8 outline-none w-4/5 h-16  my-2 mx-1 p-2  font-semibold"
            placeholder={"What's happening?"}
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
                  value={filmzPhoto || ""}
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
      <hr className="border border-gray-800" />
    </div>
  );
}

export default FilmzCreator;
