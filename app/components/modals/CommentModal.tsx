"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import useCommentModal from "@/app/hooks/useCommentModal";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/auth/Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

type Props = {};

function CommentModal({}: Props) {
  const commentModal = useCommentModal();

  const [FilmzId, setFilmzId] = useState();

  function handleEmailAndPassword(): void {
    throw new Error("Function not implemented.");
  }
  // const filmzRef = collection(db, "filmz");
  // const queryRef = query(filmzRef, where("id", "==", senderId))

  // const [Posts] = useCollectionData(queryRef);
  const body = <div className=""></div>;

  return (
    <Modal
      isOpen={commentModal.isOpen}
      title="Comments"
      actionLabel="Continue"
      onClose={commentModal.onClose}
      onSubmit={handleEmailAndPassword}
      body={body}
      footer={body}
    />
  );
}

export default CommentModal;
