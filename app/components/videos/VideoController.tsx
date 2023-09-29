"use client";
import React, { useEffect, useState } from "react";
import Button from "../inputs/Button";
import { FaHouse } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { BiCompass } from "react-icons/bi";
import { getShorts } from "@/api/Youtube";
type Props = {};

function VideoController({}: Props) {
  const [selected, setSelected] = useState("");

  const shortsss = async () => {
    const response = await getShorts("music");

    return response;
  };
  const getQueryParam = (key: string) => {
    //* Get the current URL
    const url = new URL(window.location.href);

    //* Retrieve the query parameter value
    return url.searchParams.get(key);
  };
  const pushSelected = (value: string) => {
    const url = new URL(window.location.href);

    //* Add or update the query parameter
    url.searchParams.set("select", value);

    //* Replace the current URL with the updated URL
    window.history.replaceState({}, "", url.toString());
    const select = getQueryParam("select");
    setSelected(select as string);
  };

  useEffect(() => {
    shortsss();
    const select = getQueryParam("select");
    setSelected(select as string);
  }, []);

  return (
    <div className="p-5">
      <div className=" my-5">
        <Button
          label="For You"
          onClick={() => {
            pushSelected("ForYou");
          }}
          selected={selected == "ForYou"}
          icon={FaHouse}
          mobile
        />
      </div>
      <div className="my-5">
        <Button
          label="Following"
          onClick={() => {
            pushSelected("Following");
          }}
          selected={selected == "Following"}
          icon={FiUsers}
          mobile
        />
      </div>
      <div className="my-5">
        <Button
          label="Explore"
          onClick={() => {
            pushSelected("Explore");
          }}
          selected={selected == "Explore"}
          icon={BiCompass}
          mobile
        />
      </div>
    </div>
  );
}

export default VideoController;
