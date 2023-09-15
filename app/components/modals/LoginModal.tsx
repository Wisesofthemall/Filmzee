"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
//import { toast } from "react-hot-toast";
//import useLoginModal from "../hooks/useLoginModal";
//! import {
//!   GoogleAuthProvider,
//!   onAuthStateChanged,
//!   signInWithEmailAndPassword,
//!   signInWithPopup,
//!   GithubAuthProvider,
//!   FacebookAuthProvider,
//! } from "firebase/auth";
import Heading from "../inputs/Heading";
import Input from "../inputs/Input";
import Button from "../inputs/Button";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
//! import { firebaseAuth } from "@/firebase/Firebase";
//! import useSignupModal from "../hooks/useSignupModal";

type Props = {};

function LoginModal({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const loginModal = useLoginModal();
  //const signupModal = useSignupModal();
  const [isLoading, setIsLoading] = useState(false);

  //? This function handles the google provider through firebase

  //! const handleGoogle = async () => {
  //!   try {
  //!     signInWithPopup(firebaseAuth, new GoogleAuthProvider());
  //!   } catch (error: any) {
  //!     console.log(error);
  //!     toast.error(error.message);
  //!   }
  //! };
  //? This function handles the github provider through firebase
  //! const handleGithub = async () => {
  //   try {
  //     signInWithPopup(firebaseAuth, new GithubAuthProvider());
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  //! };
  //? This function handles email and password logins
  //! const handleEmailAndPassword = async () => {
  //!   try {
  //!     await signInWithEmailAndPassword(firebaseAuth, email, password);
  //!   } catch (error: any) {
  //!     console.log(error);
  //!     toast.error(error.message);
  //!   }
  //! };
  //! const toggle = useCallback(() => {
  //!   loginModal.onClose();
  //!   signupModal.onOpen();
  //! }, [loginModal, signupModal]);

  const bodyContent = (
    <div className="items-center">
      <Heading title="Welcome Back 🎉" subtitle="Login to your account! " />
      <hr />
      <Input
        id="email"
        label="Email"
        value={email}
        stateChange={setEmail}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        value={password}
        stateChange={setPassword}
        required
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-3 mt-3">
      <hr />

      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}} //TODO: handle google
      />
      <Button
        outline
        label="Continue with Github"
        icon={BsGithub}
        onClick={() => {}} //TODO: handle Github
      />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div className="">First time using Filmzee?</div>
          <div
            onClick={() => {}} //TODO: toggle
            className="text-slate-50 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={() => {}} // TODO: handle Google
      body={bodyContent}
      footer={footerContent}
      secondaryAction={() => {}} // TODO: handle email and password
    />
  );
}

export default LoginModal;
