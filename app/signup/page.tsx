"use client";

import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { paddingForPage } from "../defineSize";
import axios from "axios";
import Image from "next/image";
// import config from "../../config/config";
import weavyArch from "../../public/assets/weavyArch.svg";
import googleIcon from "../../public/icons/google.svg";
import Link from "next/link";
import BackArrow from "../SVG/BackArrow";

export default function SignUpPage() {
  const [formdata, setFormdata] = useState({});

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:3000/api/user/signUp`,
      formdata
    );

    console.log({ "response": res });
  };

  return (
    <>
      <div className=" bg-bodybg w-full h-93vh relative">
        <div className="">
          <Image className="rotate-180 " src={weavyArch} alt="wave" />
        </div>
        <div
          className={`flex justify-center   sm:px-32 xmd:px-44 pt-10 sm:pb-20 ${paddingForPage}`}
        >
          <div className="absolute top-15% backdrop-blur-xl bg-primaryBlue/50 py-32 px-32 rounded-lg shadow-xl">
            <div className=" flex flex-col items-center justify-center gap-8 ">
              <div className="">
                <p className=" text-3xl text-white font-bold">Sign up</p>
              </div>
              <div className=" flex flex-col gap-3">
                <form
                  className=" flex flex-col gap-5 items-center "
                  onSubmit={handelSubmit}
                >
                  <input
                    className="text-lg py-1 px-2 sm:px-6 w-20rem rounded-lg bg-white text-primaryBlue "
                    type="text"
                    required
                    name=""
                    id="name"
                    placeholder="Name"
                    onChange={handelChange}
                  />

                  <input
                    className="text-lg py-1 px-2 sm:px-6  w-20rem rounded-lg bg-white text-primaryBlue "
                    type="email"
                    required
                    name=""
                    id="email"
                    placeholder="Email"
                    onChange={handelChange}
                  />
                  <input
                    className="text-lg py-1 px-2 sm:px-6  w-20rem rounded-lg bg-white text-primaryBlue "
                    type="password"
                    required
                    name=""
                    id="password"
                    placeholder="Password"
                    onChange={handelChange}
                  />
                  <button
                    className="bg-primaryBlue w-auto text-lg rounded-3xl py-1 px-10 mt-4  text-white hover:text-white hover:bg-primaryBlue"
                    type="submit"
                  >
                    Sign up
                  </button>
                </form>

                <div className="flex flex-col items-center py-6 gap-4">
                  <div className=" flex flex-row justify-center items-center bg-white rounded-md px-4 py-1 gap-2 cursor-pointer w-15rem">
                    <Image className=" w-6" src={googleIcon} alt="" />
                    <p className=" text-md font-medium">Continue with Google</p>
                  </div>

                  <Link
                    href={"/login"}
                    className="text-center text-white bg-primaryBlue rounded-md px-4 py-1.5 gap-2 cursor-pointer w-15rem"
                  >
                    <span className="text-md font-medium ">Log in</span>
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
