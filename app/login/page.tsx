"use client";

import React, { useEffect, useState } from "react";
import { paddingForPage } from "../defineSize";
import Link from "next/link";
import Image from "next/image";
import weavyArch from "../../public/assets/weavyArch.svg";
import googleIcon from "../../public/icons/google.svg";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/features/userSlice";
import { RootState } from "@/redux/store";
import {
  popupSetHeading,
  popupSetMessage,
  setTime,
  togglePopup,
} from "@/redux/features/popupSlice";
import Popup from "../components/Popups/Popup";
import {
  LoginAndSignupButtonTransition,
  buttonTransition,
  textSpreadTransition,
} from "../transitionsAndAnimations/transitions";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const [formdata, setFormdata] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const response = await res.json();

    console.log({ response: res.status });

    switch (res.status) {
      case 200:
        const pageToRedirect = sessionStorage.getItem("lastVisitedPage");
        router.push(pageToRedirect || "/");
        // window.location.href = pageToRedirect || "/";
        const userData = response.userData;
        dispatch(popupSetHeading("Successfully logged in"));
        dispatch(popupSetMessage(""));
        dispatch(setTime(3000));
        dispatch(togglePopup());
        dispatch(setUser(userData));
        return;

      case 401:
        dispatch(popupSetHeading("Login with Google for this email"));
        dispatch(popupSetMessage(""));
        dispatch(setTime(5000));
        dispatch(togglePopup());
        return;

      case 404:
        dispatch(popupSetHeading("User not found"));
        dispatch(popupSetMessage(""));
        dispatch(setTime(5000));
        dispatch(togglePopup());
        return;

      case 501:
        dispatch(popupSetHeading(" An error occurred "));
        dispatch(popupSetMessage("Error 501 accurrec in /api/user/login"));
        dispatch(setTime(5000));
        dispatch(togglePopup());
        return;

      case 500:
        dispatch(popupSetHeading(" Trouble connecting to DB "));
        dispatch(popupSetMessage(""));
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

  const popup = useSelector((state: RootState) => state.popupSlice.popup);
  const heading = useSelector((state: RootState) => state.popupSlice.heading);
  const message = useSelector((state: RootState) => state.popupSlice.message);

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

  return (
    <>
      <div className=" bg-bodybg w-full h-93vh relative">
        {/* Notification popup */}
        <Popup heading={heading} message={message} />

        <div className="">
          <Image className="rotate-180 " src={weavyArch} alt="wave" />
        </div>
        <div
          className={` flex justify-center sm:px-32 xmd:px-44 pt-10 sm:pb-20 ${paddingForPage} `}
        >
          <div className="absolute top-8% sm:top-15% backdrop-blur-xl bg-bgLightBlue w-95vw sm:w-auto  py-12 sm:py-24 sm:px-32 rounded-lg shadow-xl">
            <div className=" flex flex-col items-center justify-center gap-8 ">
              <div className="">
                <p className="text-xl sm:text-3xl text-primaryBlue font-bold">
                  Login
                </p>
              </div>
              <div className=" flex flex-col gap-3">
                <form
                  className=" flex flex-col gap-5 items-center "
                  onSubmit={handelSubmit}
                >
                  <input
                    className=" shadow-sm text-xs sm:text-sm py-2 sm:py-1.5 px-2 sm:px-6 w-20rem sm:w-20rem rounded-lg bg-white text-primaryBlue "
                    type="email"
                    required
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={handelChange}
                  />
                  <input
                    className="shadow-sm text-xs sm:text-sm py-2 sm:py-1.5 px-2 sm:px-6 w-20rem rounded-lg bg-white text-primaryBlue "
                    type="password"
                    required
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handelChange}
                  />
                  <button
                    className={`bg-primaryBlue text-xs sm:text-sm rounded-md py-2 px-10 mt-4 text-white w-20rem
                                            ${LoginAndSignupButtonTransition} shadow-md`}
                    type="submit"
                  >
                    Login
                  </button>
                </form>

                <div className=" flex flex-col items-center mt-2">
                  <Link
                    className={` text-black opacity-50 border-bodybg text-xs sm:text-sm ${textSpreadTransition}`}
                    href=""
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="flex items-center gap-2 opacity-20">
                  <div className="h-0.5 w-45% bg-black"></div>
                  <p>Or</p>
                  <div className="h-0.5 w-45% bg-black"></div>
                </div>
                <div className="flex flex-col items-center py-2 gap-4">
                  <div
                    className={` flex flex-row justify-center items-center bg-white rounded-md px-2 sm:px-4 py-2 gap-2 
                      cursor-pointer w-15rem sm:w-15rem ${buttonTransition} shadow-md`}
                    onClick={() => signIn("google")}
                  >
                    <Image className="w-3 sm:w-6" src={googleIcon} alt="" />
                    <p className="text-xs sm:text-md font-normal sm:font-medium">
                      Continue with Google
                    </p>
                  </div>
                  <Link
                    href={"/signup"}
                    className={`text-center  text-white bg-primaryBlue hover:bg-primaryBlue rounded-md px-4 
                      py-1 sm:py-1.5 gap-2 cursor-pointer w-15rem sm:w-15rem ${buttonTransition} shadow-md`}
                  >
                    <span
                      className={`text-xs sm:text-md font-normal sm:font-medium `}
                    >
                      Go to Sign Up page
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
