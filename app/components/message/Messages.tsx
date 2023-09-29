"use client";
import React, { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/auth/Firebase";
import { useAuth } from "@/auth/AuthState";
import { FirebaseUserType } from "@/types/Types";
import Image from "next/image";
type Props = { messages: any; loginUser: FirebaseUserType };

function Messages({ messages, loginUser }: Props) {
  console.log(messages);
  return (
    <div className="h-full">
      {" "}
      {messages.map((message: any) => (
        <div key={message.id} className="">
          {loginUser.localId === message.sender.localId ? (
            <div className="flex items-end justify-end m-2">
              <div className="rounded-lg p-2 bg-blue-950 mr-1">
                {message.text}
              </div>
              <Image
                className="rounded-full"
                src={loginUser.photoUrl}
                alt="some"
                width={35}
                height={35}
              />
            </div>
          ) : (
            <div className="flex items-start justify-start m-2">
              <Image
                className="rounded-full"
                src={message.sender.photoUrl}
                alt="some"
                width={35}
                height={35}
              />
              <div className="rounded-lg p-2 bg-blue-950 ml-1">
                {message.text}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Messages;
