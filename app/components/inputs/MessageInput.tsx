"use client";
import React, { useState } from "react";
import SendIcon from "./SendIcon";
import { IoImageOutline } from "react-icons/io5";
import FilmzImageUploader from "../filmz/FilmzImageUploader";
import FilmzImageRender from "../filmz/FilmzImageRender";

type Props = {
  id: string;
  value: string;
  label: string;
  type?: string;
  disabled?: boolean;
  stateChange: React.Dispatch<React.SetStateAction<string>>;
  submit: any;
  enter: any;
  required: boolean;
  messagePhoto: any;
  setMessagePhoto: any;
};

function MessageInput({
  id,
  label,
  type,
  disabled,
  stateChange,
  value,
  submit,
  enter,
  messagePhoto,
  setMessagePhoto,
}: Props) {
  return (
    <div className="w-full relative my-3 flex">
      <input
        onChange={(e) => stateChange(e.target.value)}
        value={value}
        id={id}
        onKeyDown={(e) => {
          enter(e.key);
        }}
        disabled={disabled}
        type={type}
        className={`peer
        w-full
        p-4
        pt-6
        pb-[2.25rem]
        bg-gray-700
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        pl-4
        border-neutral-300
        focus:border-blue-500
        font-semibold
        text-white`}
      />
      <label
        className={`absolute
        text-md
        duration-150
        transform
        -translate-y-3
        top-5
        z-10
        origin-[0]
        left-4
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        font-semibold
        text-white`}
      >
        {label}
      </label>
      <label
        className={`
        flex
        absolute
        text-md
        top-[3.75rem]
        z-10
        left-4
        font-semibold
        text-white`}
      >
        <FilmzImageUploader value={messagePhoto} onChange={setMessagePhoto} />
        {messagePhoto && (
          <FilmzImageRender
            photo={messagePhoto}
            deletePhoto={() => setMessagePhoto(null)}
          />
        )}
      </label>

      <div
        onClick={() => submit()}
        className="flex items-center cursor-pointer hover:opacity-60"
      >
        {(value.length > 0 || messagePhoto) && <SendIcon />}
      </div>
    </div>
  );
}

// {filmzPhoto && (
//   <FilmzImageRender
//     photo={filmzPhoto}
//     deletePhoto={() => setFilmzPhoto(null)}
//   />
// )}
// <div className="px-3">
//   <div className="flex justify-between">
//     <div className="flex items-center justify-items-center cursor-pointer ">
//       <FilmzImageUploader
//         value={filmzPhoto}
//         onChange={setFilmzPhoto}
//       />
export default MessageInput;
