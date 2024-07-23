"use client";

import React, { useState } from "react";
import { paddingForPage } from "../defineSize";
import Link from "next/link";
import Image from "next/image";
import weavyArch from "../../public/assets/weavyArch.svg";
import googleIcon from "../../public/icons/google.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart, setUser } from "@/redux/features/userSlice";

export default function LoginPage() {
  const [formdata, setFormdata] = useState({});
  const dispatch = useDispatch();

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post("/api/user/login", { formdata });

    if (res.status == 200) {
      const pageToRedirect = sessionStorage.getItem("lastVisitedPage");
      window.location.href = pageToRedirect || "/";
      const userData = res.data.userData;

      // console.log(userData);

      localStorage.setItem("ErlangUserData", JSON.stringify(userData));
      dispatch(setUser(userData));
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
          <div className="absolute top-15% backdrop-blur-xl bg-primaryBlue/50 py-32 px-32 rounded-lg shadow-xl">
            <div className=" flex flex-col items-center justify-center gap-8 ">
              <div className="">
                <p className=" text-3xl text-white font-bold">Login</p>
              </div>
              <div className=" flex flex-col gap-3">
                <form
                  className=" flex flex-col gap-5 items-center "
                  onSubmit={handelSubmit}
                >
                  <input
                    className="text-lg py-1 px-2 sm:px-6 w-20rem rounded-lg bg-white text-primaryBlue "
                    type="email"
                    required
                    name=""
                    id="email"
                    placeholder="Email"
                    onChange={handelChange}
                  />
                  <input
                    className="text-lg py-1 px-2 sm:px-6 w-20rem rounded-lg bg-white text-primaryBlue "
                    type="password"
                    required
                    name=""
                    id="password"
                    placeholder="Password"
                    onChange={handelChange}
                  />
                  <button
                    className="bg-primaryBlue text-lg rounded-3xl py-1 px-10 mt-4  text-white w-1/2 hover:text-white hover:bg-primaryBlue"
                    type="submit"
                  >
                    Login
                  </button>
                </form>

                <div className=" flex flex-col items-center mt-2">
                  <Link
                    className=" text-bodybg opacity-50 border-bodybg text-sm "
                    href=""
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="flex flex-col items-center py-2 gap-4">
                  <div className=" flex flex-row justify-center items-center bg-white rounded-md px-4 py-1 gap-2 cursor-pointer w-15rem">
                    <Image className=" w-6" src={googleIcon} alt="" />
                    <p className=" text-md font-medium">Continue with Google</p>
                  </div>
                  <Link
                    href={"/signup"}
                    className="text-center text-white bg-primaryBlue rounded-md px-4 py-1.5 gap-2 cursor-pointer w-15rem"
                  >
                    <span className="text-md font-medium ">Sign Up</span>
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
