"use client";
import { useAuth } from "@/auth/AuthState";
import { db } from "@/auth/Firebase";
import { FirebaseUserType } from "@/types/Types";
import { MenuList, MenuItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdReportGmailerrorred } from "react-icons/md";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { FiEdit3 } from "react-icons/fi";

type Props = {
  id: string;
};

function MessageMenu({ id }: Props) {
  const [docID, setDocID] = useState("");

  const messageRef = collection(db, "messages");

  const q = query(messageRef, where("id", "==", id));

  //* get message Document ID and store it
  const getDocName = async () => {
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const documentID = doc.id;

          setDocID(documentID);
        });
      })
      .catch((error) => {
        console.error("Error querying documents: ", error);
      });
  };
  //* Deletes the message
  const handleDelete = () => {
    const filmzRef = doc(db, "messages", docID);

    deleteDoc(filmzRef)
      .then(() => {
        toast.success("Successfully deleted ");
      })
      .catch(() => {
        toast.success("Error deleting Filmz ");
      });

    return;
  };

  useEffect(() => {
    getDocName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MenuList className="grid justify-center bg-gray-900  text-white rounded-lg">
      {/* MenuItems are not rendered unless Menu is open */}

      <MenuItem
        as="a"
        className="my-1 mr-1 cursor-pointer hover:text-blue-400"
        onClick={() => handleDelete()}
      >
        <div className="mx-2">
          <FaRegTrashCan />
        </div>
        Delete
      </MenuItem>
    </MenuList>
  );
}

export default MessageMenu;
