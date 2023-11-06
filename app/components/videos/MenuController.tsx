"use client";
import React, { useEffect, useState } from "react";
import Button from "../inputs/Button";
import { FaHouse } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { BiCompass } from "react-icons/bi";
import { getShorts } from "@/api/Youtube";
import { CgFeed } from "react-icons/cg";
import { getQueryParam, pushSelected } from "@/functions/urlParams";

type Props = { setSelected: any; selected: any };

function MenuController({ setSelected, selected }: Props) {
  const shortsss = async () => {
    const response = await getShorts("music");

    return response;
  };

  const pushSelect = (value: string) => {
    pushSelected("select", value);
    const select = getQueryParam("select");

    setSelected(select as string);
  };

  useEffect(() => {
    pushSelect("Filmz");

    const select = getQueryParam("select");
    setSelected(select as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="z-40 p-1 flex justify-around w-full h-[6rem]  bg-black  md:h-full md:bg-transparent md:block">
      <div className=" w-1/5 md:w-full my-5">
        <Button
          label="For You"
          onClick={() => {
            pushSelect("ForYou");
          }}
          selected={selected == "ForYou"}
          icon={FaHouse}
          mobile
        />
      </div>
      <div className=" w-1/5 md:w-full my-5">
        <Button
          label="Following"
          onClick={() => {
            pushSelect("Following");
          }}
          selected={selected == "Following"}
          icon={FiUsers}
          mobile
        />
      </div>
      <div className=" w-1/5 md:w-full my-5">
        <Button
          label="Explore"
          onClick={() => {
            pushSelect("Explore");
          }}
          selected={selected == "Explore"}
          icon={BiCompass}
          mobile
        />
      </div>
      <div className=" w-1/5 md:w-full my-5">
        <Button
          label="Filmz"
          onClick={() => {
            pushSelect("Filmz");
          }}
          selected={selected == "Filmz"}
          icon={CgFeed}
          mobile
        />
      </div>
    </div>
  );
}

export default MenuController;
