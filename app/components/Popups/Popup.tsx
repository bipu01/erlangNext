"use client";
import { rootStore } from "@/app/store/type";
import popupSlice, { togglePopup } from "@/redux/features/popupSlice";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { clearTimeout } from "timers";

export type popupProp = {
  heading: string;
  message: string;
  bgColor?: string;
};

const Popup = (prop: popupProp) => {
  const dispatch = useDispatch();
  const popup = useSelector((state: RootState) => state.popupSlice.popup);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (popup === true) {
      console.log("Setting timeout"); // Debug log
      timer = setTimeout(() => {
        console.log("Timeout triggered"); // Debug log
        dispatch(togglePopup());
      }, 1000);

      return () => {
        if (timer) {
          console.log("Clearing timeout"); // Debug log
          clearTimeout(timer);
        }
      };
    }
  }, [popup, dispatch]);

  return (
    <>
      <div
        className={`fixed flex flex-col justify-center top-3 left-5vw sm:left-25vw w-90vw sm:w-50vw h-16 text-white  backdrop-blur-xl bg-${
          prop.bgColor ? prop.bgColor : "primaryBlue/50"
        } bg-primaryBlue/50  shadow-xl rounded-lg z-50 text-center`}
      >
        <div className="text-sm font-light">{prop.heading}</div>
        <div className="text-base">{prop.message}</div>
      </div>
    </>
  );
};

export default Popup;