"use client";
import useLoginModal from "@/app/hooks/useLoginModal";

import useAuth from "@/auth/AuthState";
import Image from "next/image";
import React from "react";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { FiHeart, FiLogOut, FiSettings } from "react-icons/fi";
import {
  red,
  blue,
  lightBlue,
  indigo,
  green,
  amber,
  lightGreen,
} from "@mui/material/colors";

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
type Props = {};

function UserIcon({}: Props) {
  const user = useAuth();
  console.log(user);

  const colorShadePicker = (inputNumber: number) => {
    const minRange = 100;
    const maxRange = 900;
    const increment = 100;

    // Calculate the number of increments required to reach or exceed inputNumber
    const incrementsRequired = Math.ceil((inputNumber - minRange) / increment);

    // Calculate the resulting number within the range
    const result = minRange + incrementsRequired * increment;

    // Ensure the result is within the specified range
    const clampedResult = Math.min(Math.max(result, minRange), maxRange);
    return clampedResult;
  };

  const colorPicker = (inputNumber: number) => {
    const colors: any = [
      red,
      blue,
      lightBlue,
      indigo,
      green,
      amber,
      lightGreen,
    ];
    return colors[inputNumber % 7];
  };

  const colorMaker = (inputNumber: number) => {
    const color = colorPicker(inputNumber);
    const shade = colorShadePicker(inputNumber);
    return color[shade];
  };

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
                    bgcolor: colorMaker(parseInt(user.createdAt.slice(-3))),
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
