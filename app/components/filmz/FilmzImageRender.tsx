import Image from "next/image";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

type Props = {
  photo: string;
  deletePhoto: any;
};

function FilmzImageRender({ photo, deletePhoto }: Props) {
  return (
    <div className="px-2 w-4/5 flex justify-center">
      <Image
        className="w-3/5 h-3/5 rounded-lg"
        alt="Filmz image"
        src={photo}
        width={60}
        height={60}
      />
      <div
        className="hover:opacity-60 h-fit cursor-pointer"
        onClick={deletePhoto}
      >
        <AiOutlineCloseCircle size={30} />
      </div>
    </div>
  );
}

export default FilmzImageRender;
