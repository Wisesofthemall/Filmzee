"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Logo from "@/assets/Logo.png";
import Image from "next/image";
import ReplyCreator from "../reply/ReplyCreator";
import ReplyContainer from "../reply/ReplyContainer";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  disabled?: boolean;
  filmzId: string;
  setFilmzId: any;
};

function CModal({
  isOpen,
  onClose,
  title,
  body,
  disabled,

  filmzId,
  setFilmzId,
}: Props) {
  const [showModal, setShowModal] = useState(isOpen);

  //* Open the Modal
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  //* Close the Modal
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

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
        <div className="relative  w-[90vw]">
          <div
            className={`translate duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className="translate
              h-full
              lg:h-auto
              md:h-auto
              border-0
              rounded-lg
              shadow-lg
              relative
              flex-cols
              w-full
              bg-[#000000]
              outline-none
              focus:outline-none"
            >
              <div
                className="flex
              items-center
              p-6
              rounded-t
              justify-center
              relative
              borber-b-[1px]"
              >
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70  text-slate-50 transition absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold text-slate-50 ">
                  {title}
                </div>
                <Image
                  className="filter brightness-0 invert absolute right-9"
                  width={20}
                  height={20}
                  src={Logo}
                  alt="Logo"
                />
              </div>
              <div className="overflow-y-scroll overflow-x-hidden">
                <div className="relative p-6 flex-auto">{body}</div>
                <ReplyContainer filmzId={filmzId} />
              </div>

              <ReplyCreator filmzId={filmzId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CModal;
