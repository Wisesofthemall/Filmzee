"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { retrieveChat } from "@/database/chatsCRUD/Supabase";
import { useAuth } from "@/auth/AuthState";
import { FirebaseUserType, UserType } from "@/types/Types";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
import toast from "react-hot-toast";
import useSignupModal from "@/app/hooks/useSignupModal";

type Props = { Users: UserType };

function ProfileNavBar({ Users }: Props) {
  const [loginInfo, setLoginInfo] = useState<UserType | null>(null);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const signupModal = useSignupModal();

  const loginUser: FirebaseUserType = useAuth();

  //* Get the login user info and store it
  const getLoginInfo = async () => {
    try {
      const info = await getUserByLocalId(loginUser.localId);
      setLoginInfo(info);
    } catch (error) {
      console.error("Error Fetching User Info", error);
    }
  };
  useEffect(() => {
    if (loginUser) {
      getLoginInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser]);

  //* Creates chat between the user and the receipient and navigate to the '/message' route
  const updateChat = async () => {
    //* Check if user is logged in , if not then return a toast notification
    if (!loginInfo) {
      signupModal.onOpen();
      toast.error("Please signup first before messaging");
      return;
    }
    //* Creates a roomid based on the login user and receipient localIDs
    const roomId = [...loginUser.localId, ...Users.localId].sort().join("");
    setDisabled(true);
    try {
      await retrieveChat(
        loginUser.localId,
        (loginInfo as UserType).id,
        loginUser.createdAt,
        (loginInfo as UserType)?.displayName ||
          (loginInfo as UserType)?.email.split("@")[0],
        loginUser.email,
        (loginInfo as UserType)?.photoUrl,
        Users.id,
        Users.uniq,
        Users.name,
        Users.email,
        Users.photoUrl,
        Users.localId,
        roomId,
      );

      setDisabled(false);
      router.push("/message");
    } catch (error) {
      console.error("Error Updating chat", error);
    }
  };

  return (
    <div className="w-full h-[3rem] bg-black flex items-center  justify-between">
      <div className="text-md text-blue-400 font-bold w-1/2"></div>
      <div className=" mx-1 w-1/2 ">
        <div className=" flex">
          <div className="text-blue-400 font-semibold flex items-center">
            Filmz
          </div>
          <div
            onClick={() => updateChat()}
            className="bg-blue-400 flex justify-center rounded-full p-2 font-semibold w-[5.5rem] ml-auto"
          >
            <button disabled={disabled}>Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileNavBar;
