"use client";
import React from "react";
import SendIcon from "./SendIcon";
import FilmzImageUploader from "../filmz/FilmzImageUploader";
import FilmzImageRender from "../filmz/FilmzImageRender";

type Props = {
  id: string;
  value: string;
  label: string;
  type?: string;
  disabled?: boolean;
  stateChange: React.Dispatch<React.SetStateAction<string>>;
  submit: () => void;
  enter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  required: boolean;
  messagePhoto: string | null;
  setMessagePhoto: React.Dispatch<React.SetStateAction<string | null>>;
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
          enter(e);
        }}
        disabled={disabled}
        type={type}
        placeholder="Type a message"
        className={`peer
        w-full
        p-4
        pt-3
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
        <FilmzImageUploader
          value={messagePhoto || ""}
          onChange={setMessagePhoto}
        />
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

export default MessageInput;
