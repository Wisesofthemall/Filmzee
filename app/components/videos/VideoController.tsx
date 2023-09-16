"use client";
import React from "react";
import Button from "../inputs/Button";
import { FaHouse } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { BiCompass } from "react-icons/bi";
type Props = {};

function VideoController({}: Props) {
  return (
    <div className="p-5">
      <div className=" my-5">
        <Button label="ForYou" onClick={() => {}} icon={FaHouse} />
      </div>
      <div className="my-5">
        <Button label="Following" onClick={() => {}} icon={FiUsers} />
      </div>
      <div className="my-5">
        <Button label="Explore" onClick={() => {}} icon={BiCompass} />
      </div>
    </div>
  );
}

export default VideoController;
