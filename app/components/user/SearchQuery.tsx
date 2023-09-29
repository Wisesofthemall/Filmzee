"use client";
import { getUsersByName } from "@/database/usersCRUD/Supabase";
import { UserType } from "@/types/Types";
import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserSearchCard from "./UserSearchCard";
import { useAuth } from "@/auth/AuthState";

type Props = {
  getChat: (userId?: number) => {};
  query: string;
  hide: boolean;
  name: string | undefined;
};

function SearchQuery({ query, hide, name, getChat }: Props) {
  const user = useAuth();
  const [results, setResults] = useState<UserType[] | []>([]);
  const [queryResult, setQueryResult] = useState([]);
  const getResults = async () => {
    const users: UserType[] = await getUsersByName(query, name || "");
    setResults(users);
  };
  useEffect(() => {
    getResults();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const filteredResults = results.filter((res) => res.name.includes(query));
  }, [query, results]);

  return (
    <div
      className={`rounded-lg   ${
        hide ? "hidden" : "block"
      } overflow-y-scroll h-40`}
    >
      {results.map((u) => (
        <UserSearchCard user={u} key={u.id} getChat={getChat} />
      ))}
    </div>
  );
}

export default SearchQuery;
