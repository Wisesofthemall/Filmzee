import { useAuth } from "@/auth/AuthState";
import Image from "next/image";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiDotsVerticalRounded, BiRepost } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import FilmzCardButtons from "./FilmzCardButtons";

type Props = {};

function FilmzCard({}: Props) {
  const loginUser = useAuth();
  return (
    <div className="bg-black rounded-lg w-[34rem] h-[8rem] p-2 flex mx-4 my-2 ">
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
      <div className="">
        <div className="flex">
          <div className="font-semibold">Wisesofthemall ⭐️</div>
          <div className="text-gray-800 text-sm ml-2">
            foxxydieujuste@gmail.com
          </div>
          <div className="flex pl-20 justify-end">
            <div className="text-gray-800 text-sm hidden md:block">32 mins</div>
            <div className="text-gray-800 text-sm items-center">
              <BiDotsVerticalRounded />
            </div>
          </div>
        </div>
        <div className="text-sm p-2 w-[29rem] h-16">
          This is the first tweet in all 0f creation t noe woenw0f
          wkrfnroepmprvmpemvprmvpempmvpemvpmefo
        </div>
        <FilmzCardButtons />
      </div>
    </div>
  );
}

export default FilmzCard;
