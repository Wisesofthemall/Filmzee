import { colorMaker } from "@/functions/profileGenerator";
import { Avatar } from "@mui/material";

import Image from "next/image";
import React from "react";

type Props = {
  photoUrl: string;
  picId: number;
  email: string;
};

function DynamicPhoto({ photoUrl, picId, email }: Props) {
  return (
    <>
      {photoUrl ? (
        <Image
          className="rounded-full "
          src={photoUrl}
          alt="profile image"
          width={40}
          height={40}
        />
      ) : (
        <Avatar
          sx={{
            bgcolor: colorMaker(picId),
            width: 40,
            height: 40,
          }}
        >
          {email[0].toUpperCase()}
        </Avatar>
      )}
    </>
  );
}

export default DynamicPhoto;
