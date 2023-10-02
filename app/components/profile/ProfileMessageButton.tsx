import React from "react";

type Props = {};

function ProfileMessageButton({}: Props) {
  return (
    <div className="bg-blue-400 flex justify-center rounded-full p-2 font-semibold w-[5.5rem] ml-auto">
      <button>Message</button>
    </div>
  );
}

export default ProfileMessageButton;
