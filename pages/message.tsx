"use client";
import Navbar from "@/app/components/Navbar";
import "../app/globals.css";
import MessageContainer from "@/app/components/message/MessageContainer";
import React, { useEffect, useState } from "react";
import EditProfileModal from "@/app/components/modals/EditProfileModal";
import ImageModal from "@/app/components/modals/ImageModal";

import ToasterProvider from "@/providers/ToastProvider";
import { useAuth } from "@/auth/AuthState";

type Props = {};

function message({}: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [image, setImage] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loginUser = useAuth();

  //* If user is not log in then navigate them back to the main page
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!loginUser) {
        window.location.href = "/";
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [loginUser]);
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
