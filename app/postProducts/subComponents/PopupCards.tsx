"use client";

// import { AppDispatch } from "@/redux/store";
import {
  makeFailedCardInvisible,
  makeFailedCardVisible,
  makeSuccessCardInvisible,
  makeSuccessCardVisible,
} from "@/redux/features/postPopupSlice";
import React from "react";
import { useDispatch } from "react-redux";

export const PopupOfSuccess = () => {
  const dispatch = useDispatch();

  const setPostStatus = () => {
    dispatch(makeSuccessCardInvisible());
  };

  return (
    <div
      id="postSuccessCardContainer"
      onClick={setPostStatus}
      className=" absolute w-100vw h-120vh top-0 left-0 bg-[rgba(0,0,0,0.3)]"
    >
      <div
        //   id="postSuccessCard"
        className=" fixed top-8vh left-25vw rounded-md text-center py-4 text-xl font-medium text-bodybg w-50vw  bg-primaryBlue"
      >
        Product Successfully Posted <br />
        <span className=" text-sm font-medium">Click anywhere </span>
      </div>
    </div>
  );
};

export const PopupOfFailed = () => {
  const dispatch = useDispatch();

  const setPostStatus = () => {
    dispatch(makeFailedCardInvisible());
  };
  return (
    <div
      id="postFailedCardContainer"
      onClick={setPostStatus}
      className="  absolute w-100vw h-120vh top-0 left-0 bg-[rgba(0,0,0,0.3)]"
    >
      <div className=" fixed top-8vh left-25vw rounded-md text-center py-4 text-xl font-medium text-bodybg w-50vw  bg-red-950">
        Product post failed <br />
        <span className=" text-base font-base">Fill the form completely</span>
      </div>
    </div>
  );
};
