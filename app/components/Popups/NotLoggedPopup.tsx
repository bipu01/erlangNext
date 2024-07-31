"use client";

import {
  LoginAndSignupButtonTransition,
  buttonTransition,
} from "@/app/transitionsAndAnimations/transitions";
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
      <div className="fixed top-25vh left-5vw sm:left-15vw z-40 flex flex-col p-8 py-12 justify-between items-center h-30vh w-90vw sm:w-70vw backdrop-blur-xl bg-primaryBlue/50 text-white rounded-md shadow-lg ">
        <p className="font-bold text-lg text-white">You are not logged in</p>
        <p>
          Go to <span className="underline text-yellow-400"> login page</span>{" "}
          to continue 👇👇:{" "}
        </p>
        <Link href="/login" className={`${buttonTransition} shadow-md`}>
          <button
            className={`bg-white text-primaryBlue py-2 px-4 w-15rem text-sm rounded-md `}
          >
            Login page
          </button>
        </Link>
      </div>
    </>
  );
};

export default NotLoggedPopup;
