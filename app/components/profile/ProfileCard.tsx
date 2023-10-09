/* eslint-disable react-hooks/rules-of-hooks */

import Logo from "@/assets/Logo.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { useRouter } from "next/router";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
import { format } from "date-fns";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/auth/Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import DynamicPhoto from "../DynamicPhoto";

type Props = { setUsers: any; Users: any; id: any };

export default function ProfileCard({ setUsers, Users, id }: Props) {
  const [queryRef, setQueryRef] = useState<any>(null);

  const filmzRef = collection(db, "filmz");
  const anyCollection = query(filmzRef);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Posts] = queryRef
    ? useCollectionData(queryRef)
    : useCollectionData(anyCollection);
  const getProfileUser = async () => {
    if (id) {
      const Query = query(filmzRef, where("senderId", "==", id));
      setQueryRef(Query);
      const profileUser = await getUserByLocalId(id);
      console.log(profileUser);

      setUsers(profileUser);
    }
  };

  useEffect(() => {
    getProfileUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className="bg-black absolute h-[24rem] w-[15rem] top-[6.5rem] rounded-lg ml-1 shadow-2xl ">
      <div className="grid place-items-center w-full h-2/5 mt-1">
        <DynamicPhoto
          photoUrl={Users?.photoUrl}
          picId={parseInt(Users ? Users.uniq.slice(-3) : "100")}
          email={Users?.email}
          size={80}
        />
      </div>
      <div className="font-semibold text-lg flex justify-center my-1">
        {Users?.name}
      </div>
      <div className="text-gray-800 text-sm flex justify-center my-1">
        {Users?.email}
      </div>
      <div className=" text-sm flex justify-center my-1">{Users?.bio}</div>
      <div className="text-gray-800 flex justify-center">
        <div className="flex items-center mx-1">
          <CiLocationOn />
        </div>{" "}
        {Users?.location}
      </div>

      <div className="text-gray-800 flex justify-center">
        <div className="flex items-center mx-1">
          <AiOutlineCalendar />
        </div>{" "}
        {Users ? format(new Date(Users?.created_at), "MMM yyyy") : ""}
      </div>
      <div className="text-gray-800 flex justify-center hover:text-blue-400">
        <Image
          className="filter brightness-0 invert mx-1"
          src={Logo}
          width={10}
          height={2}
          alt="Logo"
        />{" "}
        {Posts?.length} Filmz
      </div>
    </div>
  );
}
