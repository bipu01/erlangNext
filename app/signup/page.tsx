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
      <div className=" bg-primaryBlue w-full h-screen relative">
        <div className="">
          <Image className="rotate-180 " src={weavyArch} alt="wave" />
        </div>
        <div
          className={`w-full h-full absolute top-0  sm:px-32 xmd:px-44 pt-10 sm:pb-20 ${paddingForPage}`}
        >
          <div className="backdrop-blur-xl bg-white/30 w-full h-full rounded-lg shadow-xl">
            {/* <div className=" py-8 px-8">
              <img src="./icons/back.svg" alt="" />
            </div> */}
            <div className=" flex flex-col items-center justify-center gap-8 pt-16">
              <div className="">
                <p className=" text-4xl text-primaryBlue font-bold">Sign up</p>
              </div>
              <div className=" flex flex-col gap-3">
                <form
                  className=" flex flex-col gap-5 items-center "
                  onSubmit={handelSubmit}
                >
                  <input
                    className="text-2xl py-2 px-8 sm:px-16 rounded-lg bg-white text-primaryBlue "
                    type="text"
                    required
                    name=""
                    id="name"
                    placeholder="Name"
                    onChange={handelChange}
                  />

                  <input
                    className="text-2xl py-2 px-8 sm:px-16 rounded-lg bg-white text-primaryBlue "
                    type="email"
                    required
                    name=""
                    id="email"
                    placeholder="Email"
                    onChange={handelChange}
                  />
                  <input
                    className="text-2xl py-2 px-8 sm:px-16  rounded-lg bg-white text-primaryBlue "
                    type="password"
                    required
                    name=""
                    id="password"
                    placeholder="Password"
                    onChange={handelChange}
                  />
                  <div className=" flex flex-col  items-center ">
                    <button
                      className="bg-primaryBlue w-auto text-xl rounded-3xl py-2 px-12 mt-4  text-white hover:text-white hover:bg-primaryBlue"
                      type="submit"
                    >
                      Sign up
                    </button>
                  </div>
                </form>

                <div className=" flex flex-col items-center"></div>
                <div className="flex flex-col items-center py-14">
                  <div className=" flex flex-row justify-center items-center bg-white rounded-md px-4 py-2 gap-2">
                    <Image className=" w-8" src={googleIcon} alt="" />
                    <p className=" text-xl font-semibold">
                      Continue with Google
                    </p>
                  </div>
                  <p className="text-center mt-4">
                    <span className="opacity-70 text-white">
                      Already a user? <br />
                    </span>
                    <Link href={"/login"}>
                      <span className="underline text-primaryBlue">Log in</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
