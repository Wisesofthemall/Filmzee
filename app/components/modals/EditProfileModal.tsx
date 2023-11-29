"use client";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../inputs/Heading";
import ImageUploader from "../inputs/ImageUploader";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  editUserById,
  getUserByLocalId,
  updateUserChatInfo,
} from "@/database/usersCRUD/Supabase";
import useEditProfileModal from "@/app/hooks/useEditProfileModal";
import { useAuth } from "@/auth/AuthState";
import { FirebaseUserType } from "@/types/Types";

type Props = {};

enum STEPS {
  NAME,
  PROFILEIMG,
  BIO,
  LOCATION,
  BACKGROUNDIMG,
}
function EditProfileModal({}: Props) {
  const profileModal = useEditProfileModal();
  const router = useRouter();
  const loginUser: FirebaseUserType = useAuth();

  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");
  const [localId, setLocalId] = useState(0);

  const [step, setStep] = useState(STEPS.NAME);

  //* Get the User info and store it in states
  const getUserInfo = async () => {
    const result = await getUserByLocalId(loginUser.localId);

    setName(result.name);
    setPhotoUrl(result.photoUrl);
    setBio(result.bio);
    setLocation(result.location);
    setBackgroundImg(result.backgroundImg);
    setLocalId(result.localId);
  };
  useEffect(() => {
    if (loginUser) {
      getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser]);

  //* Set the state to the previous state
  const onBack = () => {
    setStep((value) => value - 1);
  };
  //* Set the state to the next state
  const onNext = () => {
    setStep((value) => value + 1);
  };
  //* Update user photo and name in their chats
  const updateUser = async () => {
    await updateUserChatInfo(loginUser.email, photoUrl, name);
  };

  //* Add update info to the database
  const onSubmit = () => {
    //* If user is not in the last step then go to the next step
    if (step !== STEPS.BACKGROUNDIMG) {
      return onNext();
    }
    //* Edit user info to the database
    editUserById(localId, {
      name,
      photoUrl,
      bio,
      location,
      backgroundImg,
    })
      .then(() => {
        toast.success("Your profile has changed!");
        updateUser();
        router.refresh();
        setStep(STEPS.NAME);
        profileModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  //* If the user at the last step then 'Edit' if not then 'Next'
  const actionLabel = useMemo(() => {
    if (step === STEPS.BACKGROUNDIMG) {
      return "Edit";
    }
    return "Next";
  }, [step]);

  //* If the user is in the first step return nothing else return 'Back'
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.NAME) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="What do you want to be called?"
        subtitle="Press next to continue"
      />

      <Input
        id={"name change "}
        value={name}
        label="name"
        stateChange={setName}
      />
    </div>
  );

  if (step === STEPS.PROFILEIMG) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">
        <Heading
          title="What is a image that reresents you?"
          subtitle="Press next to continue"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          <div className="col-span-full">
            <ImageUploader value={photoUrl} onChange={setPhotoUrl} />
          </div>
        </div>
      </div>
    );
  }
  if (step === STEPS.BIO) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">
        <Heading
          title="What are some basic things about you?"
          subtitle="Press next to continue"
        />
        <Input
          id={"Bio change "}
          value={bio}
          label="Bio"
          stateChange={setBio}
        />
      </div>
    );
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">
        <Heading title="Where do you live?" subtitle="Press next to continue" />
        <Input
          id={"Location Change "}
          value={location}
          label="Location"
          stateChange={setLocation}
        />
      </div>
    );
  }
  if (step === STEPS.BACKGROUNDIMG) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">
        <Heading
          title="What is a background picture that describes you?"
          subtitle="Press next to continue"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          <div className="col-span-full">
            <ImageUploader value={backgroundImg} onChange={setBackgroundImg} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      title="Edit your Profile!"
      isOpen={profileModal.isOpen}
      onClose={profileModal.onClose}
      onSubmit={() => onSubmit()}
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.NAME ? undefined : onBack}
      body={bodyContent}
    />
  );
}

export default EditProfileModal;
