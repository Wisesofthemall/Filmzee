"use client";
import { getUsersByName } from "@/database/usersCRUD/Supabase";
import { FirebaseMemberType, UserType } from "@/types/Types";

import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import MembersSearchCard from "./MembersSearchCard";

type Props = {
  query: string;
  hide: boolean;
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
  addMember: (mem: FirebaseMemberType) => void;
};

function MembersQuery({ query, hide, setHide, addMember }: Props) {
  const [results, setResults] = useState<UserType[] | []>([]);
  const getResults = async () => {
    try {
      const users: UserType[] = await getUsersByName(query, "");
      setResults(users);
    } catch (error) {
      console.error("Error Fetching Users", error);
    }
  };
  useEffect(() => {
    getResults();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <div
        onClick={() => setHide(true)}
        className={`float-right cursor-pointer hover:opacity-60 text-red-600 absolute left-[0.7rem]  ${
          hide ? "hidden" : "block"
        } mt-2`}
      >
        <AiOutlineClose size={20} />
      </div>
      <div
        className={`rounded-lg absolute bg-gray-950   ${
          hide ? "hidden" : "block"
        } overflow-y-scroll h-40`}
      >
        {results.map((u) => (
          <MembersSearchCard user={u} key={u.id} addMember={addMember} />
        ))}
      </div>
    </div>
  );
}

export default MembersQuery;
