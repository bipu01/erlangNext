"use client";

import React, { useEffect, useState } from "react";
import { paddingForPage } from "../defineSize";
import Link from "next/link";
import Image from "next/image";
import weavyArch from "../../public/assets/weavyArch.svg";
import googleIcon from "../../public/icons/google.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorized, setUser } from "@/redux/features/userSlice";
import { RootState } from "@/redux/store";
import {
  popupSetHeading,
  popupSetMessage,
  togglePopup,
} from "@/redux/features/popupSlice";

export default function LoginPage() {
  const [formdata, setFormdata] = useState({});
  const dispatch = useDispatch();

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post("/api/user/login", { formdata });
    // console.log({ res: res });
    // console.log({ resStatus: res.status });
    // router.push("/");

    if (res.status === 200) {
      const pageToRedirect = sessionStorage.getItem("lastVisitedPage");
      window.location.href = pageToRedirect || "/";

      const userData = res.data.userData;
      console.log({ userData: userData });

      dispatch(popupSetHeading("Successfully logged in"));
      dispatch(popupSetMessage(""));
      dispatch(togglePopup());

      dispatch(setUser(userData));
      // dispatch(setAuthorized());
    }
  };

  return (
    <>
      <div className=" bg-bodybg w-full h-93vh relative">
        <div className="">
          <Image className="rotate-180 " src={weavyArch} alt="wave" />
        </div>
        <div
          className={` flex justify-center sm:px-32 xmd:px-44 pt-10 sm:pb-20 ${paddingForPage}`}
        >
          <div className="absolute top-5% sm:top-15% backdrop-blur-xl bg-bgLightBlue px-6 py-8 sm:py-32 sm:px-32 rounded-lg shadow-xl">
            <div className=" flex flex-col items-center justify-center gap-8 ">
              <div className="">
                <p className="text-xl sm:text-3xl text-white font-bold">
                  Login
                </p>
              </div>
              <div className=" flex flex-col gap-3">
                <form
                  className=" flex flex-col gap-5 items-center "
                  onSubmit={handelSubmit}
                >
                  <input
                    className="ttext-xs sm:text-sm py-1 sm:py-1.5 px-2 sm:px-6 w-15rem sm:w-20rem rounded-lg bg-white text-primaryBlue "
                    type="email"
                    required
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={handelChange}
                  />
                  <input
                    className="text-xs sm:text-sm py-1 sm:py-1.5 px-2 sm:px-6 w-15rem sm:w-20rem rounded-lg bg-white text-primaryBlue "
                    type="password"
                    required
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handelChange}
                  />
                  <button
                    className="bg-primaryBlue text-xs sm:text-lg rounded-3xl py-2 sm:py-1.5 px-10 mt-4  text-white sm:w-1/2 hover:text-white hover:bg-primaryBlue w-15rem"
                    type="submit"
                  >
                    Login
                  </button>
                </form>

                <div className=" flex flex-col items-center mt-2">
                  <Link
                    className=" text-black opacity-50 border-bodybg text-xs sm:text-sm "
                    href=""
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="flex flex-col items-center py-2 gap-4">
                  <div className=" flex flex-row justify-center items-center bg-white rounded-md px-2 sm:px-4 py-1 gap-2 cursor-pointer w-15rem sm:w-15rem">
                    <Image className="w-3 sm:w-6" src={googleIcon} alt="" />
                    <p className="text-xs sm:text-md font-normal sm:font-medium">
                      Continue with Google
                    </p>
                  </div>
                  <Link
                    href={"/signup"}
                    className="text-center text-white bg-primaryBlue/50 hover:bg-primaryBlue rounded-md px-4 py-1 sm:py-1.5 gap-2 cursor-pointer w-15rem sm:w-15rem"
                  >
                    <span className="text-xs sm:text-md font-normal sm:font-medium ">
                      Sign Up
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
