"use client";
import Navbar from "@/app/components/Navbar";
import "../app/globals.css";
import MessageContainer from "@/app/components/message/MessageContainer";
import React, { useState } from "react";
import EditProfileModal from "@/app/components/modals/EditProfileModal";
import ImageModal from "@/app/components/modals/ImageModal";
import GroupChatModal from "@/app/components/modals/GroupChatModal";
import ToasterProvider from "@/providers/ToastProvider";

type Props = {};

function message({}: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [image, setImage] = useState("");
  return (
    <div className=" h-[100vh] w-[100vw]">
      <Navbar />
      <ToasterProvider />
      <EditProfileModal />

      <ImageModal image={image} setImage={setImage} />
      <div className=" grid  place-items-center w-full h-[85vh]">
        <MessageContainer setImage={setImage} />
      </div>
    </div>
  );
}

export default message;
