"use client";
import Loading from "@/app/SVG/Loading";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const SpinningCircle = () => {
  const IsLoading = useSelector(
    (state: RootState) => state.postPopupReducer.loading
  );
  return (
    <div className={` animate-spin top-16 sm:top-8 fixed left-50% z-50`}>
      <img
        src="/assets/Loading.png"
        alt="Loading"
        className="sm:h-8 sm:w-8 h-6 w-6"
      />
    </div>
  );
};

export default SpinningCircle;
