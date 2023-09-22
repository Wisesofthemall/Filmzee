"use client";
import useLoginModal from "@/app/hooks/useLoginModal";

import useAuth from "@/auth/AuthState";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { FiHeart, FiLogOut, FiSettings } from "react-icons/fi";

import Avatar from "@mui/material/Avatar";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

import { FaRegBookmark, FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "@/auth/Firebase";
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
