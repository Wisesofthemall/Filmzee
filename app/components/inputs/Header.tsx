import Image from "next/image";
import React from "react";

type Props = { photo: string; name: string };

export default function Header({ photo, name }: Props) {
  return (
    <div className="w-full bg-slate-600  flex">
      <Image
        className="rounded-full"
        src={photo}
        alt="repic"
        width={60}
        height={60}
      />
      <div className="text-3xl">{name}</div>
    </div>
  );
}
