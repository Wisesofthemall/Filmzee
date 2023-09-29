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
type Props = { messages: any };

function Messages({ messages }: Props) {
  console.log(messages);
  return (
    <div>
      {" "}
      {messages.map((message: any) => (
        <div key={message.id} className="message">
          <span className="user">{message.user}:</span> {message.text}
        </div>
      ))}
    </div>
  );
}

export default Messages;
