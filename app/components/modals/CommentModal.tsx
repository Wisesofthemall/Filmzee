"use client";
import React from "react";
import useCommentModal from "@/app/hooks/useCommentModal";
import FilmzMain from "../filmz/FilmzMain";
import CModal from "./CModal";

type Props = {
  filmzId: string;
  setFilmzId: React.Dispatch<React.SetStateAction<string>>;
};

function CommentModal({ filmzId, setFilmzId }: Props) {
  const commentModal = useCommentModal();

  const body = (
    <div className="w-full h-full">
      <FilmzMain filmzId={filmzId} setFilmzId={setFilmzId} />
    </div>
  );

  return (
    <CModal
      isOpen={commentModal.isOpen}
      title="Post"
      onClose={commentModal.onClose}
      body={body}
      filmzId={filmzId}
      setFilmzId={setFilmzId}
    />
  );
}

export default CommentModal;
