import React, { useState } from "react";

import { useRouter } from "next/router";
import { retrieveChat } from "@/database/chatsCRUD/Supabase";
import { useAuth } from "@/auth/AuthState";
import { FirebaseUserType } from "@/types/Types";

type Props = { Users: any };

function ProfileNavBar({ Users }: Props) {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const loginUser: FirebaseUserType = useAuth();

  const updateChat = async () => {
    const roomId = [...loginUser.localId, ...Users.localId].sort().join("");
    setDisabled(true);
    await retrieveChat(
      loginUser.localId,
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
