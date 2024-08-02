"use client";

import { useEffect, useLayoutEffect } from "react";
import { paddingForPage } from "../defineSize";
import { PopupOfFailed, PopupOfSuccess } from "./subComponents/PopupCards";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import { setUser } from "@/redux/features/userSlice";
import Popup from "../components/Popups/Popup";
import SpinningCircle from "../components/LoadingComponents/SpinningCircle";

const FormLayout = dynamic(() => import("./subComponents/FormLayout"), {
  ssr: false,
});

const PostProducts = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    const verifyIsAdmin = async () => {
      try {
        const res = await fetch("/api/user/verifyAdmin");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log({ data: data });
      } catch (error) {
        console.log({ "Error verifying admin": error });
      }
    };
    verifyIsAdmin();

    const getUser = async () => {
      const res = await fetch("/api/user/info");
      const parsedRes = await res.json();
      const user = parsedRes.message;
      console.log(user);
      console.log({ user: user });
      if (user !== "undefined") {
        dispatch(setUser(user));
      }
    };

    getUser();
  }, []);

  const heading = useSelector((state: RootState) => state.popupSlice.heading);
  const message = useSelector((state: RootState) => state.popupSlice.message);
  const isLoading = useSelector(
    (state: RootState) => state.postPopupReducer.loading
  );

  return (
    <>
      <div
        className={` ${paddingForPage}  bg-bodybg flex flex-col items-center`}
      >
        {isLoading && <SpinningCircle />}

        {postStatus === 1 ? (
          <PopupOfSuccess />
        ) : postStatus === 2 ? (
          <PopupOfFailed />
        ) : (
          ""
        )}

        <Popup heading={heading} message={message} />

        <h1 className=" text-2xl font-bold text-primaryBlue ">
          Upload Products
        </h1>
        <FormLayout />
      </div>
    </>
  );
};

export default PostProducts;
