"use client";
import React, { useEffect, useState } from "react";
import { paddingForPage } from "../defineSize";
import axios from "axios";
import Image from "next/image";
import googleIcon from "../../public/icons/google.svg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  makeOTPUIActive,
  setEmail,
  toggleSignupWithGoogleUIStatus,
} from "@/redux/features/signUpSlice";
import {
  popupSetHeading,
  popupSetMessage,
  setTime,
  togglePopup,
} from "@/redux/features/popupSlice";
import {
  LoginAndSignupButtonTransition,
  buttonTransition,
} from "../transitionsAndAnimations/transitions";
import { signIn, useSession } from "next-auth/react";
import { setUser } from "@/redux/features/userSlice";

const SignUpUI = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const { data: session, status } = useSession();
  // console.log({ session: session, status: status });

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Automatically send user data to the signup route
      const sendUserData = async () => {
        try {
          const res = await fetch("/api/user/googlesignin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(session.user),
          });

          if (!res.ok) {
            throw new Error("Failed to send user data");
          }

          const response = await res.json();
          dispatch(setUser(response.userData));
          console.log({ response: response.userData });
        } catch (error) {
          console.error("Error sending user data:", error);
        }
      };

      sendUserData();
    }
  }, [session, status]);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ formdata: formdata });

    const res = await fetch(`api/user/sendOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });

    switch (res.status) {
      case 200:
        dispatch(popupSetHeading("Signup Success"));
        dispatch(popupSetMessage("Go to login page to continue"));
        dispatch(setTime(3000));
        dispatch(togglePopup());
        dispatch(makeOTPUIActive());
        dispatch(setEmail(formdata.email));
        return;
      case 409:
        dispatch(popupSetHeading("User already exists on this account"));
        dispatch(popupSetMessage("Go to login page to continue"));
        dispatch(setTime(5000));
        dispatch(togglePopup());
        return;
      default:
        dispatch(popupSetHeading("No expected response from backend"));
        dispatch(popupSetMessage(""));
        dispatch(setTime(5000));
        dispatch(togglePopup());
        return;
    }
  };

  const handleSignupWithGoogle = () => {
    dispatch(toggleSignupWithGoogleUIStatus());
    // dispatch();
  };
  return (
    <>
      {" "}
      <div
        className={`flex justify-center sm:px-32 xmd:px-44 pt-10 sm:pb-20 ${paddingForPage}`}
      >
        <div className="absolute top-8% sm:top-15% backdrop-blur-xl bg-bgLightBlue w-95vw sm:w-auto  py-12 sm:py-24 sm:px-32 rounded-lg shadow-xl">
          <div className=" flex flex-col items-center justify-center gap-8 ">
            <div className="">
              <p className="text-xl sm:text-3xl text-primaryBlue font-bold">
                Sign up
              </p>
            </div>
            <div className=" flex flex-col gap-3">
              <form
                className=" flex flex-col gap-5 items-center "
                onSubmit={handelSubmit}
              >
                <input
                  className="text-xs sm:text-sm py-2 sm:py-1.5 px-2 sm:px-6 w-20rem sm:w-20rem rounded-lg bg-white text-primaryBlue shadow-sm"
                  type="text"
                  required
                  name=""
                  id="name"
                  placeholder="Name"
                  onChange={handelChange}
                />

                <input
                  className="text-xs sm:text-sm py-2 sm:py-1.5 px-2 sm:px-6 w-20rem sm:w-20rem rounded-lg bg-white text-primaryBlue shadow-sm "
                  type="email"
                  required
                  name=""
                  id="email"
                  placeholder="Email"
                  onChange={handelChange}
                />
                <input
                  className="text-xs sm:text-sm py-2 sm:py-1.5 px-2 sm:px-6 w-20rem sm:w-20rem rounded-lg bg-white text-primaryBlue shadow-sm "
                  type="password"
                  required
                  name=""
                  id="password"
                  placeholder="New password"
                  onChange={handelChange}
                />
                <button
                  className={`bg-primaryBlue text-xs sm:text-sm rounded-md py-2 px-10 mt-4  text-white w-20rem 
                    ${LoginAndSignupButtonTransition} shadow-md`}
                  type="submit"
                >
                  Verify
                </button>
              </form>
              <div className="flex items-center gap-2 opacity-20 mt-4">
                <div className="h-0.5 w-45% bg-black"></div>
                <p>Or</p>
                <div className="h-0.5 w-45% bg-black"></div>
                <div></div>
              </div>
              <div className="flex flex-col items-center py-6 gap-4">
                <div
                  className={` flex flex-row justify-center items-center bg-white rounded-md px-4 py-2 gap-2 cursor-pointer 
                   w-15rem ${buttonTransition} shadow-md`}
                  onClick={() => signIn("google")}
                >
                  <Image className="w-3 sm:w-6" src={googleIcon} alt="" />
                  <p className="text-xs sm:text-md font-normal sm:font-medium ">
                    Continue with Google
                  </p>
                </div>
                {/* <GoogleSignIn /> */}

                <Link
                  href={"/login"}
                  className={`text-center text-white bg-primaryBlue hover:bg-primaryBlue rounded-md px-4 py-1.5 sm:py-1.5 gap-2 
                    cursor-pointer w-15rem ${buttonTransition} shadow-md`}
                >
                  <span className="text-xs sm:text-md font-normal sm:font-medium ">
                    Go to Login page
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpUI;
