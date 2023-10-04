import { useAuth } from "@/auth/AuthState";
import { FirebaseUserType } from "@/types/Types";
import Logo from "@/assets/Logo.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { useRouter } from "next/router";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
import { format } from "date-fns";

type Props = {};

export default function ProfileCard({}: Props) {
  const [User, setUser] = useState<any>(null);
  const loginUser: FirebaseUserType = useAuth();
  const router = useRouter();
  const id: any = router.query.id;
  const getProfileUser = async () => {
    const profileUser = await getUserByLocalId(id);
    console.log(profileUser);
    setUser(profileUser);
  };

  useEffect(() => {
    getProfileUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-black absolute h-[24rem] w-[15rem] top-[6.5rem] rounded-lg ml-1 shadow-2xl ">
      <div className="grid place-items-center w-full h-2/5 mt-1">
        {User ? (
          <Image
            className="rounded-full"
            src={User.photoUrl}
            alt="s0me"
            width={80}
            height={80}
          />
        ) : (
          <div className=""></div>
        )}
      </div>
      <div className="font-semibold text-lg flex justify-center my-1">
        {User?.displayName}
      </div>
      <div className="text-gray-800 text-sm flex justify-center my-1">
        {User?.email}
      </div>
      <div className=" text-sm flex justify-center my-1">
        The Developer of this app
      </div>
      <div className="text-gray-800 flex justify-center">
        <div className="flex items-center mx-1">
          <CiLocationOn />
        </div>{" "}
        Florida
      </div>

      <div className="text-gray-800 flex justify-center">
        <div className="flex items-center mx-1">
          <AiOutlineCalendar />
        </div>{" "}
        {User ? format(User?.created_at.toDate(), "MMMM yyyy") : ""}
      </div>
      <div className="text-gray-800 flex justify-center hover:text-blue-400">
        <Image
          className="filter brightness-0 invert mx-1"
          src={Logo}
          width={10}
          height={2}
          alt="Logo"
        />{" "}
        7 Filmz
      </div>
    </div>
  );
}
