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
              {user.photoUrl ? (
                <Image
                  className="rounded-full "
                  src={user.photoUrl}
                  alt="profile image"
                  width={40}
                  height={40}
                />
              ) : (
                <Avatar
                  sx={{
                    bgcolor: color(picId),
                  }}
                >
                  {user.email[0].toUpperCase()}
                </Avatar>
              )}
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
