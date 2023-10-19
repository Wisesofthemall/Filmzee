"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../inputs/Button";
import Logo from "@/assets/Logo.png";
import Image from "next/image";
import FilmzCreator from "../filmz/FilmzCreator";
import ReplyCreator from "../reply/ReplyCreator";
import ReplyContainer from "../reply/ReplyContainer";
type Props = {
  isOpen?: boolean;
  onClose: () => void;
  image: string;
};

function IModal({ isOpen, onClose, image }: Props) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  return (
    <>
      <div
        className={`${showModal ? "block" : "hidden"} justify-center
        xitems-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed inset-0
        z-50
        outline-none
        focus:outline-none
        bg-black
        `}
      >
        <div className="relative  w-[90vw] overflow-x-hidden">
          <div
            className={` flex justify-center items-center translate duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className="translate
              h-8/10
              border-0
              rounded-lg
              shadow-lg
              relative
              flex-cols
              w-full
              bg-[#000000]
              outline-none
              focus:outline-none
              overflow-x-hidden"
            >
              <div
                className="flex
              items-center
              p-6
              rounded-t
              justify-center
              relative
              borber-b-[1px]
              overflow-x-hidden"
              >
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70  text-slate-50 transition absolute left-9"
                >
                  <IoMdClose size={38} />
                </button>
              </div>
              <div className=" w-full h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <Image
                    src={image}
                    className="w-4/5 h-4/5 object-contain"
                    alt="Image Expanded"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IModal;
