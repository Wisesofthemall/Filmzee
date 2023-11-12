"use client";
import React, { ReactElement } from "react";

type Props = { header: string; subtitle: string; content: ReactElement };

function NewsContainer({ header, subtitle, content }: Props) {
  return (
    <div className="bg-gray-800 rounded-lg w-full  p-3 my-3">
      <div className=" w-full  font-extrabold text-2xl flex justify-center">
        {header}
      </div>
      <div className=" w-full  font-extrabold text-lg flex justify-center">
        {subtitle}
      </div>
      {content}
    </div>
  );
}

export default NewsContainer;
