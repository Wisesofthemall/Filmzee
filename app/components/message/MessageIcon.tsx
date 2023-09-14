import React from "react";

type Props = {};
import { BiMessageAltDetail } from "react-icons/bi";
function MessageIcon({}: Props) {
  return (
    <div className="flex justify-center items-center ">
      <BiMessageAltDetail size={26} />
    </div>
  );
}

export default MessageIcon;
