"use client";
import Image from "next/image";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import FilmzCardButtons from "./FilmzCardButtons";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import DynamicPhoto from "../DynamicPhoto";
import { FirebaseUserType } from "@/types/Types";
import { Menu, MenuButton } from "@chakra-ui/react";
import FilmzMenu from "./FilmzMenu";
import useImageModal from "@/app/hooks/useImageModal";

type Props = {
  main?: boolean;
  post: {
    text: string;
    createdAt: any;
    likes: { [key: string]: string };
    senderId: string;
    sender: FirebaseUserType;
    image: string;
    id: string;
  };
  setFilmzId: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

function FilmzCard({ main, post, setFilmzId, setImage }: Props) {
  const router = useRouter();
  const imageModal = useImageModal();

  //* Returns the estimated time of the filmz
  const formattedTimeDifference: string = formatDistanceToNow(
    post.createdAt.toDate(),
    {
      addSuffix: true,
      includeSeconds: true,
    },
  );

  //* Opens Modal that have the expanded image of the filmz
  const handleImageExpander = (image: string) => {
    setImage(image);
    imageModal.onOpen();
  };

  return (
    <div className={`${main ? "w-full" : "w-full m-2"}`}>
      <div
        className={`bg-black rounded-lg    p-2 flex    ${
          main ? "w-full" : "w-full"
        }`}
      >
        <div
          className=" ml-2 mt-1 cursor-pointer hover:opacity-60"
          onClick={() => router.push(`/profile/${post.senderId}`)}
        >
          <DynamicPhoto
            photoUrl={post.sender?.photoUrl}
            email={post.sender.email}
            picId={parseInt(post.sender.createdAt.slice(-3))}
          />
        </div>
        <div className="w-full h-full ">
          <div className="flex pl-2">
            <div
              onClick={() => router.push(`/profile/${post.senderId}`)}
              className="font-semibold cursor-pointer hover:opacity-60"
            >
              {post.sender?.displayName
                ? post.sender?.displayName
                : post.sender.email.split("@")[0]}
            </div>
            <div
              onClick={() => router.push(`/profile/${post.senderId}`)}
              className="text-gray-800 text-sm ml-2 cursor-pointer hover:opacity-60"
            >
              {post.sender?.email}
            </div>
            <div className="flex pl-20 justify-end ml-auto">
              <div className="text-gray-800 text-sm hidden md:block">
                {formattedTimeDifference}
              </div>
              <div className="flex text-gray-800 text-sm items-center">
                <Menu isLazy>
                  <MenuButton>
                    <BiDotsVerticalRounded size={20} />
                  </MenuButton>
                  <FilmzMenu
                    FilmzUser={post.sender.localId}
                    id={post.createdAt}
                  />
                </Menu>
              </div>
            </div>
          </div>
          {post.text && (
            <p className="text-sm p-2 w-full flex flex-wrap overflow-wrap break-word ">
              {post.text}
            </p>
          )}

          {post.image && (
            <div
              onClick={() => handleImageExpander(post.image)}
              className="my-2 flex justify-center"
            >
              <Image
                alt="filmz image"
                className="w-3/5 h-3/5 rounded-lg cursor-pointer"
                src={post.image}
                width={60}
                height={60}
              />
            </div>
          )}

          <FilmzCardButtons
            likes={post.likes}
            id={post.createdAt}
            filmzId={post.id}
            setFilmzId={setFilmzId}
          />
        </div>
      </div>
      <hr className="border border-gray-800" />
    </div>
  );
}

export default FilmzCard;
