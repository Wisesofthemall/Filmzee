"use client";
import useLoginModal from "@/app/hooks/useLoginModal";
import useAuth from "@/auth/AuthState";
import Image from "next/image";
import React from "react";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { FiHeart, FiLogOut, FiSettings } from "react-icons/fi";
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
type Props = {};

function UserIcon({}: Props) {
  const user = useAuth();
  console.log(user);
  const signup = useSignupModal();
  const OpenModal = () => {
    signup.onOpen();
  };
  const handleLogOut = () => {
    signOut(firebaseAuth);
  };
  return (
    <div className="flex justify-center items-center">
      {user ? (
        <div className="mx-1 ">
          <Menu isLazy>
            <MenuButton>
              {user.photoUrl ? (
                <Image
                  className="rounded-full "
                  src={user.photoUrl}
                  alt="profile image"
                  width={28}
                  height={28}
                />
              ) : (
                <FaUserCircle size={26} />
              )}
            </MenuButton>
            <MenuList
              className="grid justify-center bg-gray-800  text-white rounded-lg"
              boxSize={177}
            >
              {/* MenuItems are not rendered unless Menu is open */}

              <MenuItem as="a" href="#" className="my-1">
                <div className="mx-2">
                  <AiOutlineUser />
                </div>
                View Profile
              </MenuItem>
              <MenuItem as="a" href="#" className="my-1">
                <div className="mx-2">
                  <FaRegBookmark />
                </div>
                Favorites
              </MenuItem>
              <MenuItem as="a" href="#" className="my-1">
                <div className="mx-2">
                  <FiHeart />
                </div>
                Likes
              </MenuItem>
              <MenuItem as="a" href="#" className="my-1 mb-2">
                <div className="mx-2">
                  <FiSettings />
                </div>
                Settings
              </MenuItem>
              <MenuDivider />
              <MenuItem
                as="a"
                onClick={() => {
                  handleLogOut();
                }}
                className="my-3"
              >
                <div className="mx-2">
                  <FiLogOut />
                </div>
                Log Out
              </MenuItem>
            </MenuList>
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
