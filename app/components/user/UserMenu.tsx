import { firebaseAuth } from "@/auth/Firebase";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { FiHeart, FiLogOut, FiSettings } from "react-icons/fi";

type Props = {};

function UserMenu({}: Props) {
  const handleLogOut = () => {
    signOut(firebaseAuth);
  };
  return (
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
  );
}

export default UserMenu;
