"use client";
import { getUsersByName } from "@/database/usersCRUD/Supabase";
import { UserType } from "@/types/Types";
import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserSearchCard from "./UserSearchCard";

type Props = {
  query: string;
  hide: boolean;
};

function SearchQuery({ query, hide }: Props) {
  const [results, setResults] = useState<UserType[] | []>([]);

  const getResults = async () => {
    console.log(query);
    const users: UserType[] = await getUsersByName(query);
    setResults(users);
    console.log(users);
  };
  useEffect(() => {
    getResults();
  }, [query]);

  return (
    <div className={`rounded-lg   ${hide ? "hidden" : "block"}`}>
      {results.map((u) => (
        <UserSearchCard user={u} key={u.id} />
      ))}
    </div>
  );
}

export default SearchQuery;
