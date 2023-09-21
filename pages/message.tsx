import Navbar from "@/app/components/Navbar";
import "../app/globals.css";
import MessageContainer from "@/app/components/message/MessageContainer";
import React, { useState } from "react";

type Props = {};

function message({}: Props) {
  return (
    <div className=" h-[100vh] w-[100vw]">
      <Navbar />
      <div className=" grid  md:place-items-center w-full h-full">
        <MessageContainer />
      </div>
    </div>
  );
}

export default message;
