import { firebaseAuth } from "@/auth/Firebase";
import { MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { FiHeart, FiLogOut, FiSettings } from "react-icons/fi";

type Props = {};

function UserMenu({}: Props) {
  const router = useRouter();
  const handleLogOut = () => {
    signOut(firebaseAuth);
    router.push("/");
  };
  return (
    <MenuList
      className="grid justify-center bg-gray-800  text-white rounded-lg"
      boxSize={177}
    >
      {/* MenuItems are not rendered unless Menu is open */}

      <MenuItem as="a" href="#" className="my-1 cursor-pointer">
        <div className="mx-2">
          <AiOutlineUser />
        </div>
        View Profile
      </MenuItem>
      <MenuItem as="a" href="#" className="my-1 cursor-pointer">
        <div className="mx-2">
          <FaRegBookmark />
        </div>
        Favorites
      </MenuItem>
      <MenuItem as="a" href="#" className="my-1 cursor-pointer">
        <div className="mx-2">
          <FiHeart />
        </div>
        Likes
      </MenuItem>
      <MenuItem as="a" href="#" className="my-1 mb-2 cursor-pointer">
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
        className="my-3 cursor-pointer"
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
