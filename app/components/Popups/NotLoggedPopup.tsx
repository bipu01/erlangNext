"use client";

import { toggleNotLoggedPopup, togglePopup } from "@/redux/features/popupSlice";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const NotLoggedPopup = () => {
  const dispatch = useDispatch();

  const makeToggleInvisible = () => {
    dispatch(toggleNotLoggedPopup());
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 h-100vh w-100vw bg-black/40 z-40"
        onClick={makeToggleInvisible}
      ></div>
      <div className="fixed top-25vh left-5vw sm:left-15vw z-40 flex flex-col p-8 pb-16 justify-between items-center h-30vh w-90vw sm:w-70vw backdrop-blur-xl bg-primaryBlue/60 text-white rounded-md ">
        <p className="font-bold text-lg text-white">You are not logged in</p>
        <p>Go to login page to continue 👇👇: </p>
        <Link href="/login">
          <button className="bg-white text-primaryBlue p-2 px-4 rounded-md ">
            Login page
          </button>
        </Link>
      </div>
    </>
  );
};

export default NotLoggedPopup;
