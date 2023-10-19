"use client";
import useEditProfileModal from "@/app/hooks/useEditProfileModal";
import { useAuth } from "@/auth/AuthState";
import { db, firebaseAuth } from "@/auth/Firebase";
import { FirebaseUserType } from "@/types/Types";
import { MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdReportGmailerrorred } from "react-icons/md";
import { FiEye, FiHeart, FiLogOut, FiSettings } from "react-icons/fi";
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
};

function FilmzMenu({ FilmzUser, id }: Props) {
  const loginUser: FirebaseUserType = useAuth();

  const [docID, setDocID] = useState("");

  const filmzCardRef = collection(db, "filmz");
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
    console.log(docID);
    const filmzRef = doc(db, "filmz", docID);
    console.log(filmzRef);
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
