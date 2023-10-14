import { colorMaker } from "@/functions/profileGenerator";
import { Avatar } from "@mui/material";

import Image from "next/image";
import React from "react";

type Props = {
  photoUrl?: string;
  picId?: number;
  email?: string;
  size?: number;
};

function DynamicPhoto({
  photoUrl,
  picId = 200,
  email = "?",
  size = 43,
}: Props) {
  return (
    <>
      {photoUrl ? (
        <Image
          className="rounded-full "
          src={photoUrl}
          alt="profile image"
          width={size}
          height={size}
        />
      ) : (
        <Avatar
          sx={{
            bgcolor: colorMaker(picId),
            width: size,
            height: size,
            zIndex: 0,
          }}
        >
          {email ? email[0].toUpperCase() : "?"}
        </Avatar>
      )}
    </>
  );
}

export default DynamicPhoto;
