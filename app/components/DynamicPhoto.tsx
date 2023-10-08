import { colorMaker } from "@/functions/profileGenerator";
import { Avatar } from "@mui/material";

import Image from "next/image";
import React from "react";

type Props = {
  photoUrl?: string;
  picId?: number;
  email?: string;
};

function DynamicPhoto({ photoUrl, picId = 200, email = "?" }: Props) {
  return (
    <>
      {photoUrl ? (
        <Image
          className="rounded-full "
          src={photoUrl}
          alt="profile image"
          width={43}
          height={43}
        />
      ) : (
        <Avatar
          sx={{
            bgcolor: colorMaker(picId),
            width: 43,
            height: 43,
          }}
        >
          {email ? email[0].toUpperCase() : "?"}
        </Avatar>
      )}
    </>
  );
}

export default DynamicPhoto;
