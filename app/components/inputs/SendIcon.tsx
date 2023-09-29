import React from "react";
import { FiSend } from "react-icons/fi";

type Props = {};

function SendIcon({}: Props) {
  return (
    <div className=" flex items-center text-blue-500">
      <FiSend size={40} />
    </div>
  );
}

export default SendIcon;
