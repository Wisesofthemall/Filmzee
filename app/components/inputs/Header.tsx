"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import DynamicPhoto from "../DynamicPhoto";
import { useRouter } from "next/navigation";
import { PiInfoBold } from "react-icons/pi";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { db } from "@/auth/Firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import MemberCard from "../members/MemberCard";
import { FirebaseUserType } from "@/types/Types";
import { useAuth } from "@/auth/AuthState";
import toast from "react-hot-toast";
import { deleteChatByLocalID } from "@/database/chatsCRUD/Supabase";
import useAddMemberModal from "@/app/hooks/useAddMemberModal";
import { TbPencil } from "react-icons/tb";
import EditGroupChatModal from "../modals/EditGroupChat";

type Props = {
  photo: string;
  name: string;
  uniq: string;
  showCurrent: any;
  setShowCurrent: any;
  localId: any;
  email: any;
  isGroupChat: boolean;
  id: number | null;
  roomId: string;
};

export default function Header({
  photo,
  name,
  uniq,
  showCurrent,
  setShowCurrent,
  email,
  localId,
  isGroupChat,
  id,
  roomId,
}: Props) {
  const [picId, setPicId] = useState(200);
  const [docID, setDocID] = useState("");
  const [currentMemberLength, setCurrentMemberLength] = useState(0);
  const router = useRouter();
  const groupInfoRef = collection(db, "groupInfo");
  const queryRef = query(groupInfoRef, where("roomId", "==", roomId));
  const loginUser: FirebaseUserType = useAuth();
  const addMember = useAddMemberModal();

  const [Posts] = useCollectionData(queryRef);

  //* Creates a picID base on 'uniq' and stores it
  useEffect(() => {
    if (uniq) {
      const id = parseInt(uniq.slice(-3));

      setPicId(id);
    }
  }, [uniq]);

  const groupCardRef = collection(db, "groupInfo");
  const q = query(groupCardRef, where("roomId", "==", roomId));

  //* Get the Document ID of the current collection and store it
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

  //* Update the member list without the removed user
  const updateMemberList = (num: string) => {
    const groupRef = doc(db, "groupInfo", docID);

    if (Posts) {
      updateDoc(groupRef, {
        membersArray: Posts[0].membersArray.filter(
          (mem: any) => mem.localId !== num,
        ),
      });
    }
  };

  //* Allows Owner to remove users
  const handleRemove = async (userId: string) => {
    //* Check if login user is the owner
    if (Posts && loginUser.localId !== Posts[0].membersArray[0].localId) {
      toast.error("Only the Owner can remove someone from the group ");
      return;
    }
    //*Check if the user trying to remove themselves from the group
    if (loginUser.localId === userId) {
      toast.error("Owners cannot remove themselves from the group");
      return;
    }
    try {
      //* Delete Chat from deleted User
      await deleteChatByLocalID(userId);
      //* Update Member List
      updateMemberList(userId);
      toast.success("Sucessfully removed member from group");
    } catch (error) {
      toast.error("Error deleting user");
    }
  };
  useEffect(() => {
    if (localId) {
      getDocName();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localId]);

  useEffect(() => {
    if (Posts && Posts[0]) {
      let currentMembers: [] = Posts[0].membersArray;
      let check = currentMembers.filter(
        (member: any) => member.localId === loginUser.localId,
      );
      //* Give a toast notification to the deleted user that he has been removed and refresh website
      if (check.length === 0) {
        toast.error("You have been removed from the group");
        router.refresh();
      }

      if (currentMemberLength === 0) {
        setCurrentMemberLength(currentMembers.length);
        return;
      }
      //* Give a toast notification to users that a new member has been added
      if (currentMembers.length > currentMemberLength) {
        toast.success("A new member has been added");

        //* Give a toast notification to users that a new member has been removed
      } else if (currentMembers.length < currentMemberLength) {
        toast.success("A member has been removed");
      }
      setCurrentMemberLength(currentMembers.length);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Posts]);

  return (
    <div className="w-full bg-blue-400  flex items-center rounded-lg">
      <EditGroupChatModal
        roomId={roomId}
        chatName={name}
        chatImage={photo}
        uniq={uniq}
      />
      <div
        onClick={() => {
          setShowCurrent(false);
        }}
        className="left-0 cursor-pointer hover:opacity-60"
      >
        <AiOutlineLeft size={26} />
      </div>
      <div className="flex w-1/2 mx-auto">
        <div
          className="cursor-pointer hover:opacity-60"
          onClick={() => {
            if (!id) {
              return;
            }
            router.push(`/profile/${localId}`);
          }}
        >
          <DynamicPhoto photoUrl={photo} picId={picId} email={name} />
        </div>
        <div className="">
          <div className="text-2xl mx-2  font-semibold">{name}</div>
          <div className=" mx-2 text-gray-800 text-sm  font-semibold">
            {email}
          </div>
        </div>
      </div>
      {isGroupChat && (
        <div className="flex ml-auto mr-5 cursor-pointer">
          {Posts &&
            Posts[0] &&
            Posts[0].membersArray &&
            loginUser?.localId === Posts[0].membersArray[0].localId && (
              <div
                onClick={() => addMember.onOpen()}
                className="mx-2 font-bold cursor-pointer"
              >
                <TbPencil size={30} />
              </div>
            )}

          <Menu isLazy>
            <MenuButton className="cursor-pointer">
              <PiInfoBold size={30} />
            </MenuButton>
            <MenuList
              className=" bg-black  text-white rounded-lg overflow-y-scroll "
              boxSize={300}
            >
              <MenuItem as="a" className="my-1 cursor-default">
                <div className="mx-2 font-bold">
                  <div className="">
                    <div className="my-1">Owner:</div>
                    {Posts && Posts[0] && Posts[0].membersArray && (
                      <MemberCard
                        mem={Posts[0].membersArray[0]}
                        key={Posts[0].membersArray[0].localId}
                        onRemove={() =>
                          handleRemove(Posts[0].membersArray[0].localId)
                        }
                      />
                    )}

                    <div className="my-1">Members:</div>
                    {Posts &&
                      Posts[0] &&
                      Posts[0].membersArray &&
                      Posts[0].membersArray.slice(1).map((post: any) => (
                        <div key={post.uniq} className="w-full my-1">
                          <MemberCard
                            mem={post}
                            key={post.localId}
                            onRemove={() => handleRemove(post.localId)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      )}
    </div>
  );
}
