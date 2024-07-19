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
  const postStatus = useSelector(
    (state: RootState) => state.postPopupReducer.status
  );

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const postFailedCard = document.getElementById("postFailedCardContainer");
      const postSuccessCard = document.getElementById(
        "postSuccessCardContainer"
      );
      if (postStatus === 1) {
        if (postSuccessCard) {
          postSuccessCard.style.display = `block`;
        }
      } else if (postStatus === 2) {
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
        {postStatus === 1 ? (
          <PopupOfSuccess />
        ) : postStatus === 2 ? (
          <PopupOfFailed />
        ) : (
          ""
        )}

        <h1 className=" text-2xl font-bold text-primaryBlue ">
          Upload Products
        </h1>
        <FormLayout />
      </div>
    </>
  );
};

export default PostProducts;
