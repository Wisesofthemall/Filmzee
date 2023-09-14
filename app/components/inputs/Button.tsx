"use client";

import React from "react";
import { IconType } from "react-icons";

type Props = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

function Button({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
        outline ? "bg-white" : "bg-green-600"
      }  ${outline ? "border-black" : "bg-green-600"} ${
        outline ? "text-black" : "bg-green-600"
      } ${small ? "py-1" : "py-3"} ${small ? "text-sm" : "text-md"} ${
        outline ? "border-[1px]" : "border-[2px]"
      } ${outline ? "font-light" : "font-semibold"}`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
}

export default Button;
