"use client";
import { getUsersByName } from "@/database/usersCRUD/Supabase";
import { UserType } from "@/types/Types";
import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserSearchCard from "./UserSearchCard";
import useAuth from "@/auth/AuthState";

type Props = {
  query: string;
  hide: boolean;
  name: string | undefined;
};

function SearchQuery({ query, hide, name }: Props) {
  const user = useAuth();
  const [results, setResults] = useState<UserType[] | []>([]);
  const getResults = async () => {
    const users: UserType[] = await getUsersByName(query, name || "");
    setResults(users);
  };
  useEffect(() => {
    getResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
