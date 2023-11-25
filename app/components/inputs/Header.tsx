"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import DynamicPhoto from "../DynamicPhoto";
import { useRouter } from "next/navigation";
import { PiInfoBold } from "react-icons/pi";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { db } from "@/auth/Firebase";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import MemberCard from "../members/MemberCard";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
import { FirebaseUserType, MemberType } from "@/types/Types";
import { useAuth } from "@/auth/AuthState";
import toast from "react-hot-toast";
import { deleteChatByLocalID } from "@/database/chatsCRUD/Supabase";
import { IoMdAddCircleOutline } from "react-icons/io";
import useAddMemberModal from "@/app/hooks/useAddMemberModal";
import AddMemberModal from "../modals/AddMemberModal";

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
  const [owner, setOwner] = useState<any>({});
  const [docID, setDocID] = useState("");
  const router = useRouter();
  const groupInfoRef = collection(db, "groupInfo");
  const queryRef = query(groupInfoRef, where("roomId", "==", roomId));
  const loginUser: FirebaseUserType = useAuth();
  const addMember = useAddMemberModal();
  const [Posts] = useCollectionData(queryRef);
  useEffect(() => {
    if (uniq) {
      const id = parseInt(uniq.slice(-3));

      setPicId(id);
    }
  }, [uniq]);

  const groupCardRef = collection(db, "groupInfo");
  const q = query(groupCardRef, where("roomId", "==", roomId));

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

  const getOwnerInfo = async () => {
    const own = await getUserByLocalId(localId);
    setOwner(own);
  };
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

  const handleRemove = async (userId: string) => {
    if (loginUser.localId !== localId) {
      toast.error("Only the Owner can remove someone from the group ");
      return;
    }
    if (loginUser.localId === userId) {
      toast.error("Owners cannot remove themselves from the group");
      return;
    }
    try {
      await deleteChatByLocalID(userId);
      updateMemberList(userId);
      toast.success("Sucessfully removed member from group");
    } catch (error) {
      toast.error("Error deleting user");
    }
  };
  useEffect(() => {
    if (localId) {
      getOwnerInfo();
      getDocName();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localId]);

  useEffect(() => {
    if (Posts) {
      let currentMembers: [] = Posts[0].membersArray;
      let check = currentMembers.filter(
        (member: any) => member.localId === loginUser.localId,
      );
      if (check.length === 0) {
        toast.error("You have been removed from the group");
        router.refresh();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Posts]);

  return (
    <div className="w-full bg-blue-400  flex items-center rounded-lg">
      <AddMemberModal
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
        <div
          onClick={() => addMember.onOpen()}
          className="flex ml-auto mr-5 cursor-pointer"
        >
          {loginUser?.localId === localId && (
            <div className="mx-2 font-bold cursor-pointer">
              <IoMdAddCircleOutline size={30} />
            </div>
          )}{" "}
          <Menu isLazy>
            <MenuButton className="cursor-pointer">
              <PiInfoBold size={30} />
            </MenuButton>
            <MenuList
              className=" bg-black  text-white rounded-lg overflow-y-scroll "
              boxSize={300}
            >
              <MenuItem as="a" className="my-1">
                <div className="mx-2 font-bold">
                  <div className="">
                    <div className="my-1">Owner:</div>
                    <MemberCard
                      mem={owner}
                      key={owner.localId}
                      onRemove={() => console.log("remove")}
                    />

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
