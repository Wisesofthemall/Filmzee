import Navbar from "@/app/components/Navbar";
import "../app/globals.css";
import MessageContainer from "@/app/components/message/MessageContainer";
import React from "react";
import EditProfileModal from "@/app/components/modals/EditProfileModal";

type Props = {};

function message({}: Props) {
  return (
    <div className=" h-[100vh] w-[100vw]">
      <Navbar />
      <EditProfileModal />
      <div className=" grid  place-items-center w-full h-[85vh]">
        <MessageContainer />
      </div>
    </div>
  );
}

export default message;
