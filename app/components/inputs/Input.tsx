import React from "react";

type Props = {
  id: string;
  value: string;
  label: string;
  type?: string;
  disabled?: boolean;
  stateChange: React.Dispatch<React.SetStateAction<string>>;
  dark?: boolean;

  required?: boolean;
};

function Input({ id, label, type, disabled, stateChange, value, dark }: Props) {
  return (
    <div className="w-full relative my-5">
      <input
        onChange={(e) => stateChange(e.target.value)}
        value={value}
        id={id}
        disabled={disabled}
        type={type}
        className={`peer
        w-full
        p-4
        pt-6
        font-light
        ${dark ? " bg-gray-900 " : " bg-white "}
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        pl-4
        border-neutral-300
        focus:border-black
        ${dark ? "text-white" : "text-black"}`}
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
        text-zinc-400`}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
