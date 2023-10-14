"use client";
require("dotenv").config();
import React from "react";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { IoImageOutline } from "react-icons/io5";

declare global {
  var cloudinary: any;
}
type Props = {
  onChange: (value: string) => void;
  value: string;
};

declare global {
  var cloudinary: any;
}

function FilmzImageUploader({ onChange, value }: Props) {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange],
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="Filmzee"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div className="hover:text-blue-400" onClick={() => open?.()}>
            <IoImageOutline size={30} />
          </div>
        );
      }}
    </CldUploadWidget>
  );
}

export default FilmzImageUploader;
