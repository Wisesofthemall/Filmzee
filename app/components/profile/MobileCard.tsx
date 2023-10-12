"use client";
import { db } from "@/auth/Firebase";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
import { collection, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import DynamicPhoto from "../DynamicPhoto";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineCalendar } from "react-icons/ai";
import { format } from "date-fns";
import Image from "next/image";
import Logo from "@/assets/Logo.png";

type Props = {
  Users: any;
  setUsers: any;
  id: any;
};

function MobileCard({ Users, setUsers, id }: Props) {
  const [queryRef, setQueryRef] = useState<any>(null);

  const filmzRef = collection(db, "filmz");
  const anyCollection = query(filmzRef);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Posts] = queryRef
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useCollectionData(queryRef)
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useCollectionData(anyCollection);
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
    <div className="bg-black  w-full px-4">
      <div className="flex justify-between">
        <div className="font-semibold text-lg flex justify-center my-1">
          {Users?.name}
        </div>
        <div className="text-gray-800 text-sm flex justify-center my-1 items-center mx-1">
          {Users?.email}
        </div>
      </div>
      <div className="">
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
    </div>
  );
}

export default MobileCard;