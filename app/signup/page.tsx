"use client";

import React, { useState } from "react";
import { paddingForPage } from "../defineSize";
import axios from "axios";
import Image from "next/image";
import weavyArch from "../../public/assets/weavyArch.svg";
import googleIcon from "../../public/icons/google.svg";
import Link from "next/link";

export default function SignUpPage() {
  const [formdata, setFormdata] = useState({});

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post(`api/user/signup`, formdata);
    if (res.status == 200) {
      window.location.href = "/login";
    }
    console.log({ "response": res });
  };

  return (
    <>
      <div className=" bg-bodybg w-full h-93vh relative">
        <div className="">
          <Image className="rotate-180 " src={weavyArch} alt="wave" />
        </div>
        <div
          className={`flex justify-center sm:px-32 xmd:px-44 pt-10 sm:pb-20 ${paddingForPage}`}
        >
          <div className="absolute top-5% sm:top-15% backdrop-blur-xl bg-primaryBlue/50 px-6 py-8 sm:py-24 sm:px-32 rounded-lg shadow-xl">
            <div className=" flex flex-col items-center justify-center gap-8 ">
              <div className="">
                <p className="text-xl sm:text-3xl text-white font-bold">
                  Sign up
                </p>
              </div>
              <div className=" flex flex-col gap-3">
                <form
                  className=" flex flex-col gap-5 items-center "
                  onSubmit={handelSubmit}
                >
                  <input
                    className="text-xs sm:text-sm py-1 sm:py-1.5 px-2 sm:px-6 w-15rem sm:w-20rem rounded-lg bg-white text-primaryBlue "
                    type="text"
                    required
                    name=""
                    id="name"
                    placeholder="Name"
                    onChange={handelChange}
                  />

                  <input
                    className="text-xs sm:text-sm py-1 sm:py-1.5 px-2 sm:px-6 w-15rem sm:w-20rem rounded-lg bg-white text-primaryBlue "
                    type="email"
                    required
                    name=""
                    id="email"
                    placeholder="Email"
                    onChange={handelChange}
                  />
                  <input
                    className="text-xs sm:text-sm py-1 sm:py-1.5 px-2 sm:px-6 w-15rem sm:w-20rem rounded-lg bg-white text-primaryBlue "
                    type="password"
                    required
                    name=""
                    id="password"
                    placeholder="Password"
                    onChange={handelChange}
                  />
                  <button
                    className="bg-primaryBlue text-xs sm:text-lg rounded-3xl py-2 sm:py-1.5 px-10 mt-4  text-white sm:w-1/2 hover:text-white hover:bg-primaryBlue w-15rem"
                    type="submit"
                  >
                    Sign up
                  </button>
                </form>

                <div className="flex flex-col items-center py-6 gap-4">
                  <div className=" flex flex-row justify-center items-center bg-white rounded-md px-4 py-1 gap-2 cursor-pointer w-15rem">
                    <Image className="w-3 sm:w-6" src={googleIcon} alt="" />
                    <p className="text-xs sm:text-md font-normal sm:font-medium">
                      Continue with Google
                    </p>
                  </div>

                  <Link
                    href={"/login"}
                    className="text-center text-white bg-primaryBlue/50 hover:bg-primaryBlue rounded-md px-4 py-1 sm:py-1.5 gap-2 cursor-pointer w-15rem sm:w-15rem"
                  >
                    <span className="text-xs sm:text-md font-normal sm:font-medium ">
                      Log in
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
