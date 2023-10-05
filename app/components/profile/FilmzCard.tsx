import Image from "next/image";
import React from "react";

import { BiDotsVerticalRounded, BiRepost } from "react-icons/bi";

import FilmzCardButtons from "./FilmzCardButtons";

import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

type dataType = {};
type Props = {
  main?: boolean;
  post: any;
};

function FilmzCard({ main, post }: Props) {
  const router = useRouter();

  // S

  const formattedTimeDifference = formatDistanceToNow(post.createdAt.toDate(), {
    addSuffix: true,
  });

  return (
    <div className={`${main ? "w-full" : "m-2"}`}>
      <div
        className={`bg-black rounded-lg    p-2 flex    ${
          main ? "w-full" : "w-full"
        }`}
      >
        <div
          className=" ml-2 mt-1 cursor-pointer"
          onClick={() => router.push(`/profile/${post.senderId}`)}
        >
          {post.sender?.photoUrl ? (
            <Image
              className="rounded-full hidden md:block"
              src={post.sender.photoUrl}
              alt="post photo"
              width={50}
              height={50}
            />
          ) : (
            <div className=""></div>
          )}
        </div>
        <div className="w-full h-full ">
          <div className="flex pl-2">
            <div
              onClick={() => router.push(`/profile/${post.senderId}`)}
              className="font-semibold cursor-pointer"
            >
              {post.sender?.displayName}
            </div>
            <div
              onClick={() => router.push(`/profile/${post.senderId}`)}
              className="text-gray-800 text-sm ml-2 cursor-pointer"
            >
              {post.sender?.email}
            </div>
            <div className="flex pl-20 justify-end ml-auto">
              <div className="text-gray-800 text-sm hidden md:block">
                {formattedTimeDifference}
              </div>
              <div className="text-gray-800 text-sm items-center">
                <BiDotsVerticalRounded />
              </div>
            </div>
          </div>
          <p className="text-sm p-2 w-full flex flex-wrap overflow-wrap break-word">
            {post.text}
          </p>

          <FilmzCardButtons likes={post.likes} id={post.createdAt} />
        </div>
      </div>
      {main && <hr className="border border-gray-800" />}
    </div>
  );
}

export default FilmzCard;
