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
import toast from "react-hot-toast";

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

  //* Submit the comment to the database
  const handleSubmit = async () => {
    //* If user is not login then open the signup modal and end the sending process
    if (!loginUser) {
      signupModal.onOpen();
      return;
    }
    //* If user did not add any content then show an error toast notification
    if (newPost === "" && !filmzPhoto) {
      toast.error("Please add a text or image");
      return;
    }
    //* Filter any curse words out
    const post = newPost.length !== 0 ? filter.clean(newPost) : null;

    //* Add Comment to database
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

    //* Set state to its default state
    setNewPost("");
    setFilmzPhoto(null);
  };

  //* Get User info and store it in a state
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

  //* Submit the comment to the database
  const handleEnter = async (e: any) => {
    //* Check if the user click the 'Enter' Key
    if (e === "Enter") {
      //* If user is not login then open the signup modal and end the sending process
      if (!loginUser) {
        signupModal.onOpen();
        return;
      }

      //* If user did not add any content then show an error toast notification
      if (newPost === "" && !filmzPhoto) {
        toast.error("Please add a text or image");
        return;
      }

      //* Filter any curse words out
      const post = newPost.length !== 0 ? filter.clean(newPost) : null;
      //* Add Comment to database
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

      //* Set state to its default state
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
              size={40}
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
