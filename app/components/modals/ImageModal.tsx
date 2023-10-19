"use client";
import React, { useEffect, useState } from "react";
import useCommentModal from "@/app/hooks/useCommentModal";
import FilmzMain from "../filmz/FilmzMain";
import CModal from "./CModal";
import FilmzCreator from "../filmz/FilmzCreator";
import IModal from "./IModal";
import useImageModal from "@/app/hooks/useImageModal";

type Props = {
  image: string;
  setImage: any;
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
