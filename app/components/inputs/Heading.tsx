import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

function Heading({ title, subtitle, center }: Props) {
  return (
    <div
      className={`${center ? "text-center" : "text-start"} my-5 text-slate-50`}
    >
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-white mt-2">{subtitle}</div>
    </div>
  );
}

export default Heading;
