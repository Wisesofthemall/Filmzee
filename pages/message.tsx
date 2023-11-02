"use client";
import Navbar from "@/app/components/Navbar";
import "../app/globals.css";
import MessageContainer from "@/app/components/message/MessageContainer";
import React, { useState } from "react";
import EditProfileModal from "@/app/components/modals/EditProfileModal";
import ImageModal from "@/app/components/modals/ImageModal";

type Props = {};

function message({}: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [image, setImage] = useState("");
  return (
    <div className=" h-[100vh] w-[100vw]">
      <Navbar />
      <EditProfileModal />
      <ImageModal image={image} setImage={setImage} />
      <div className=" grid  place-items-center w-full h-[85vh]">
        <MessageContainer setImage={setImage} />
      </div>
    </div>
  );
}

export default message;
