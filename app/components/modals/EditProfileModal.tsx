"use client";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";

import Heading from "../inputs/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageUploader from "../inputs/ImageUploader";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { editUserById, getUserByLocalId } from "@/database/usersCRUD/Supabase";
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
  const [userInfo, setUserInfo] = useState<any>({});

  const [step, setStep] = useState(STEPS.NAME);
  const [isLoading, setIsLoading] = useState(false);
  const getUserInfo = async () => {
    const result = await getUserByLocalId(loginUser.localId);

    setUserInfo(result);
  };
  useEffect(() => {
    if (loginUser) {
      getUserInfo();
    }
  }, [loginUser]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: userInfo?.name,
      profileImg: userInfo?.photoUrl,
      bio: userInfo?.Bio,
      location: userInfo?.location,
      backgoundImg: userInfo?.backgroundImg,
    },
  });

  const name = watch("name");
  const profileImg = watch("profileImg");
  const bio = watch("bio");
  const location = watch("location");
  const backgoundImg = watch("backgoundImg");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };
  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    if (step !== STEPS.BACKGROUNDIMG) {
      return onNext();
    }

    setIsLoading(true);

    editUserById(12, {})
      .then(() => {
        toast.success("Your listing has been created!");
        router.refresh();
        reset();
        setStep(STEPS.NAME);
        profileModal.onClose();
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.BACKGROUNDIMG) {
      return "Create";
    }
    return "Next";
  }, [step]);

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
        value={userInfo?.name}
        label="name"
        stateChange={(value) => setCustomValue("name", value)}
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
            <ImageUploader
              value={profileImg}
              onChange={(value) => setCustomValue("profileImg", value)}
            />
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
        name: userInfo?.name, profileImg: userInfo?.photoUrl, bio:
        <Input
          id={"Bio change "}
          value={userInfo?.Bio}
          label="Bio"
          stateChange={(value) => setCustomValue("bio", value)}
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
          value={userInfo?.location}
          label="Location"
          stateChange={(value) => setCustomValue("location", value)}
        />
      </div>
    );
  }
  if (step === STEPS.BACKGROUNDIMG) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">
        <Heading
          title="What is a picture that best describes you?"
          subtitle="Press next to continue"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          <div className="col-span-full">
            <ImageUploader
              value={backgoundImg}
              onChange={(value) => setCustomValue("backgoundImg", value)}
            />
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
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.NAME ? undefined : onBack}
      body={bodyContent}
    />
  );
}

export default EditProfileModal;
