"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../inputs/Button";
import Logo from "@/assets/Logo.png";
import Image from "next/image";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  footer?: React.ReactElement;
  body?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
};

function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  footer,
  body,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
}: Props) {
  const [showModal, setShowModal] = useState(isOpen);

  //* Opens Modal
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  //* Close Modal if its not disabled
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  //* Invoke Submit Function if its not disable
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  //* Function returns nothing if secondaryAction is not defined or disabled
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed inset-0
        z-50
        outline-none
        focus:outline-none
        bg-black
        "
      >
        <div
          className="relative
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto
          h-full
          lg:h-auto
          md:h-auto
        "
        >
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
              <div className="relative p-6 flex-auto">{body}</div>
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryLabel && (
                    <Button
                      outline
                      label={secondaryLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button outline label={actionLabel} onClick={handleSubmit} />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
