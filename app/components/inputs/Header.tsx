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
import { collection, orderBy, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import MemberCard from "../members/MemberCard";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";
import { MemberType } from "@/types/Types";

type Props = {
  photo: string;
  name: string;
  uniq: string;
  showCurrent: any;
  setShowCurrent: any;
  localId: any;
  email: any;
  edit: boolean;
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
  edit,
  id,
  roomId,
}: Props) {
  const router = useRouter();
  const [picId, setPicId] = useState(200);
  const groupInfoRef = collection(db, "groupInfo");
  const queryRef = query(groupInfoRef, where("roomId", "==", roomId));
  const [owner, setOwner] = useState<any>({});

  const [Posts] = useCollectionData(queryRef);
  useEffect(() => {
    if (uniq) {
      const id = parseInt(uniq.slice(-3));

      setPicId(id);
    }
  }, [uniq]);

  const getOwnerInfo = async () => {
    const own = await getUserByLocalId(localId);
    setOwner(own);
  };
  useEffect(() => {
    if (localId) {
      getOwnerInfo();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localId]);

  return (
    <div className="w-full bg-blue-400  flex items-center rounded-lg">
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
      {edit && (
        <div className="ml-auto mr-5">
          {" "}
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
                      Posts[0].membersArray.map((post: any) => (
                        <div key={post.uniq} className="w-full my-1">
                          <MemberCard
                            mem={post}
                            key={post.localId}
                            onRemove={() => console.log("remove")}
                          />
                        </div>
                      ))}
                  </div>
                  <hr />
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      )}
    </div>
  );
}
