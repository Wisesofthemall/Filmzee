import Navbar from "@/app/components/Navbar";
import "../app/globals.css";
import MessageContainer from "@/app/components/message/MessageContainer";
import React, { useState } from "react";

type Props = {};

function message({}: Props) {
  return (
    <div className=" h-[100vh] w-[100vw]">
      <Navbar />
      <div className=" grid  place-items-center w-full h-[80vh]">
        <MessageContainer />
      </div>
    </div>
  );
}

export default message;
