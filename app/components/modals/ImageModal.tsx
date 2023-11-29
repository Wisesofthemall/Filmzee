"use client";
import React from "react";
import IModal from "./IModal";
import useImageModal from "@/app/hooks/useImageModal";

type Props = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

function ImageModal({ image }: Props) {
  const imageModal = useImageModal();

  return (
    <IModal
      isOpen={imageModal.isOpen}
      onClose={imageModal.onClose}
      image={image}
    />
  );
}

export default ImageModal;
