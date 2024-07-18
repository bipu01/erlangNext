"use client";

import { useLayoutEffect } from "react";
import { paddingForPage } from "../defineSize";
import { PopupOfFailed, PopupOfSuccess } from "./subComponents/PopupCards";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// import FormLayout from "./subComponents/FormLayout";
import dynamic from "next/dynamic";

const FormLayout = dynamic(() => import("./subComponents/FormLayout"), {
  ssr: false,
});

const PostProducts = () => {
  const postListner = useSelector(
    (state: RootState) => state.postPopupReducer.status
  );
  const postSuccessStatus = useSelector(
    (state: RootState) => state.postPopupReducer.successCard.isVisible
  );

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const postFailedCard = document.getElementById("postFailedCardContainer");
      const postSuccessCard = document.getElementById(
        "postSuccessCardContainer"
      );
      if (postSuccessStatus == true) {
        if (postSuccessCard) {
          postSuccessCard.style.display = `block`;
        }
      } else {
        if (postFailedCard) {
          postFailedCard.style.display = `block`;
        }
      }
    }
  }, [postListner]);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const postFailedCard = document.getElementById("postFailedCardContainer");
      const postSuccessCard = document.getElementById(
        "postSuccessCardContainer"
      );
      if (postFailedCard) {
        postFailedCard.style.display = `none`;
      }
      if (postSuccessCard) {
        postSuccessCard.style.display = `none`;
      }
    }
  }, []);

  return (
    <>
      <div
        className={` ${paddingForPage}  bg-bodybg flex flex-col items-center`}
      >
        {postSuccessStatus ? <PopupOfSuccess /> : <PopupOfFailed />}

        <h1 className=" text-2xl font-bold text-primaryBlue ">
          Upload Products
        </h1>
        <FormLayout />
      </div>
    </>
  );
};

export default PostProducts;
