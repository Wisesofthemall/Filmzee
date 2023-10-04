import "@/app/globals.css";
import React from "react";
import Navbar from "@/app/components/Navbar";
import pic from "@/public/ExamplePic.jpg";
import Image from "next/image";
import ProfileCard from "@/app/components/profile/ProfileCard";
import ProfileMessageButton from "@/app/components/profile/ProfileMessageButton";
import ProfileNavBar from "@/app/components/profile/ProfileNavBar";
import FilmzContainer from "@/app/components/profile/FilmzContainer";
import { useRouter } from "next/router";
type Props = {};

function ProfileContainer({}: Props) {
  const router = useRouter();
  const id: any = router.query.id;

  return (
    <div className="h-[100vh] w-[100vw] bg-gray-900">
      <Navbar />
      <div className="w-full h-[15rem] relative">
        <Image
          className="w-full h-full object-cover"
          src={pic}
          alt="profile pic"
        />

        <ProfileCard />
        <ProfileNavBar />
        <FilmzContainer main={false} senderId={id} />
      </div>
    </div>
  );
}

export default ProfileContainer;