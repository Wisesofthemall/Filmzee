"use client";

import { useAuth } from "@/auth/AuthState";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

import Avatar from "@mui/material/Avatar";

import { Menu, MenuButton } from "@chakra-ui/react";

import useSignupModal from "@/app/hooks/useSignupModal";
import UserMenu from "./UserMenu";
import { colorMaker } from "@/functions/profileGenerator";
import DynamicPhoto from "../DynamicPhoto";
type Props = {};

function UserIcon({}: Props) {
  const [picId, setPicId] = useState(100);
  const user = useAuth();

  useEffect(() => {
    if (user) {
      const id = parseInt(user.createdAt.slice(-3));
      setPicId(id);
    }
  }, [user]);

  const color: any = colorMaker(picId);
  const signup = useSignupModal();
  const OpenModal = () => {
    signup.onOpen();
  };

  return (
    <div className="flex justify-center items-center z-40">
      {user ? (
        <div className="mx-1 ">
          <Menu isLazy>
            <MenuButton>
              <DynamicPhoto
                photoUrl={user.photoUrl}
                picId={picId}
                email={user.email}
              />
            </MenuButton>
            <UserMenu />
          </Menu>
        </div>
      ) : (
        <div onClick={() => OpenModal()}>
          <AiOutlineUser size={26} />
        </div>
      )}
    </div>
  );
}

export default UserIcon;
