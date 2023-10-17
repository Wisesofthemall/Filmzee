"use client";
import React, { useEffect, useState } from "react";
import useCommentModal from "@/app/hooks/useCommentModal";
import FilmzMain from "../profile/FilmzMain";
import CModal from "./CModal";

type Props = {};

function CommentModal({}: Props) {
  const commentModal = useCommentModal();

  const body = (
    <div className="w-[70vw] h-[70vh]">
      {" "}
      <FilmzMain />
    </div>
  );

  return (
    <CModal
      isOpen={commentModal.isOpen}
      title="Comments"
      onClose={commentModal.onClose}
      body={body}
    />
  );
}

export default CommentModal;
