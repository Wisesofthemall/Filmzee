import "@/app/globals.css";
import React from "react";
import Navbar from "@/app/components/Navbar";
import pic from "@/public/ExamplePic.jpg";
import Image from "next/image";
import ProfileCard from "@/app/components/profile/ProfileCard";
import ProfileMessageButton from "@/app/components/profile/ProfileMessageButton";
import ProfileNavBar from "@/app/components/profile/ProfileNavBar";
type Props = {};

function ProfileContainer({}: Props) {
  return (
    <div className="h-[100vh] w-[100vw] bg-gray-800">
      <Navbar />
      <div className="w-full h-[15rem] relative">
        <Image
          className="w-full h-full object-cover"
          src={pic}
          alt="profile pic"
        />

        <ProfileCard />
        <ProfileNavBar />
      </div>
    </div>
  );
}

export default ProfileContainer;
