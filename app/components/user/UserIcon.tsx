"use client";
import { useAuth } from "@/auth/AuthState";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Menu, MenuButton } from "@chakra-ui/react";
import useSignupModal from "@/app/hooks/useSignupModal";
import UserMenu from "./UserMenu";
import DynamicPhoto from "../DynamicPhoto";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
import { UserType } from "@/types/Types";

type Props = {};

function UserIcon({}: Props) {
  const [picId, setPicId] = useState(100);
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const user = useAuth();
  const signup = useSignupModal();

  useEffect(() => {
    if (user) {
      const id = parseInt(user.createdAt.slice(-3));
      setPicId(id);
    }
  }, [user]);

  const getInfo = async () => {
    const result = await getUserByLocalId(user.localId);

    setUserInfo(result);
  };

  useEffect(() => {
    if (user) {
      getInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex justify-center items-center z-40">
      {user ? (
        <div className="mx-1 ">
          <Menu isLazy>
            <MenuButton>
              <DynamicPhoto
                photoUrl={userInfo ? userInfo.photoUrl : undefined}
                picId={picId}
                email={user.email}
              />
            </MenuButton>
            <UserMenu />
          </Menu>
        </div>
      ) : (
        <div onClick={() => signup.onOpen()}>
          <AiOutlineUser size={26} />
        </div>
      )}
    </div>
  );
}

export default UserIcon;
