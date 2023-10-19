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

type Props = {
  FilmzUser: string;
  id: any;
  reply?: boolean;
};

function FilmzMenu({ FilmzUser, id, reply }: Props) {
  const loginUser: FirebaseUserType = useAuth();

  const [docID, setDocID] = useState("");

  const filmzCardRef = reply
    ? collection(db, "replies")
    : collection(db, "filmz");
  const q = id
    ? query(filmzCardRef, where("createdAt", "==", id))
    : query(filmzCardRef, where("createdAt", "==", new Date()));
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
  const handleDelete = () => {
    const filmzRef = reply
      ? doc(db, "replies", docID)
      : doc(db, "filmz", docID);

    deleteDoc(filmzRef)
      .then(() => {
        toast.success("Successfully deleted ");
      })
      .catch(() => {
        toast.success("Error deleting Filmz ");
      });

    return;
  };
  const handleReport = () => {
    toast.success("Successfully Reported");
  };
  useEffect(() => {
    getDocName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MenuList className="grid justify-center bg-gray-900  text-white rounded-lg">
      {/* MenuItems are not rendered unless Menu is open */}
      {FilmzUser === loginUser?.localId && (
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
      )}

      <MenuItem
        as="a"
        className="my-1 mr-1 cursor-pointer hover:text-blue-400"
        onClick={() => handleReport()}
      >
        <div className="mx-2">
          <MdReportGmailerrorred />
        </div>
        Report
      </MenuItem>
    </MenuList>
  );
}

export default FilmzMenu;
