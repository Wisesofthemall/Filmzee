import "@/app/globals.css";
import React, { useState } from "react";
import Navbar from "@/app/components/Navbar";
import pic from "@/public/ExamplePic.jpg";
import Image from "next/image";
import ProfileCard from "@/app/components/profile/ProfileCard";

import ProfileNavBar from "@/app/components/profile/ProfileNavBar";
import FilmzContainer from "@/app/components/filmz/FilmzContainer";
import { useRouter } from "next/router";
import EditProfileModal from "@/app/components/modals/EditProfileModal";
import MobileProfileCard from "@/app/components/profile/MobileProfileCard";
import CommentModal from "@/app/components/modals/CommentModal";
import ImageModal from "@/app/components/modals/ImageModal";
import useImageModal from "@/app/hooks/useImageModal";
import ToasterProvider from "@/providers/ToastProvider";

type Props = {};

function ProfileContainer({}: Props) {
  const [Users, setUsers] = useState<any>(null);
  const [image, setImage] = useState("");
  const imageModal = useImageModal();
  const [filmzId, setFilmzId] = useState("");

  const handleImageExpander = (image: string) => {
    imageModal.onOpen();
    setImage(image);
  };
  const router = useRouter();
  const id: any = router.query.id;

  return (
    <div className="h-[100vh] w-[100vw] bg-black">
      <ToasterProvider />
      <CommentModal filmzId={filmzId} setFilmzId={setFilmzId} />
      <ImageModal image={image} setImage={setImage} />
      <Navbar />
      <EditProfileModal />
      <div className="w-full h-[15rem] relative">
        <div className="">
          <div className="hidden md:block">
            <div
              onClick={() =>
                handleImageExpander(
                  Users?.backgroundImg ? Users.backgroundImg : pic,
                )
              }
              className="h-[18rem] w-full"
            >
              <Image
                width={180}
                height={100}
                className="w-full h-full object-fill cursor-pointer"
                src={Users?.backgroundImg ? Users.backgroundImg : pic}
                alt="profile pic"
              />
            </div>
            <ProfileCard Users={Users} setUsers={setUsers} id={id} />
          </div>
          <div className="block md:hidden">
            <MobileProfileCard
              Users={Users}
              setUsers={setUsers}
              pic={pic}
              id={id}
            />
          </div>
        </div>
        <ProfileNavBar Users={Users} />
        <FilmzContainer
          setFilmzId={setFilmzId}
          main={false}
          senderId={id}
          setImage={setImage}
        />
      </div>
    </div>
  );
}

export default ProfileContainer;
