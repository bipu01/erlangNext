"use client";
import React, { useEffect, useState } from "react";
import { paddingForPage } from "../defineSize";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { makeOTPUIActive } from "@/redux/features/signUpSlice";
import {
  popupSetHeading,
  popupSetMessage,
  setTime,
  togglePopup,
} from "@/redux/features/popupSlice";
import { LoginAndSignupButtonTransition } from "../transitionsAndAnimations/transitions";

const OTPVerifyUI = () => {
  const [formdata, setFormdata] = useState({
    OTP: 0,
    email: "",
  });

  const email = useSelector((state: RootState) => state.signUpSlice.email);

  useEffect(() => {
    setFormdata({ email: email, OTP: 0 });
  }, []);

  const dispatch = useDispatch();

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
    // setFormdata({ ...formdata, email: email });
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ formdata: formdata });
    const res = await fetch(`api/user/verifyOTP`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const response = await res.json();

    switch (res.status) {
      case 200:
        dispatch(makeOTPUIActive());
        dispatch(popupSetHeading("Successfully signed up"));
        dispatch(popupSetMessage("Go to login page and continue"));
        dispatch(setTime(5000));
        dispatch(togglePopup());
        window.location.href = "/login";
      case 400:
        dispatch(popupSetHeading("Something went wrong"));
        dispatch(popupSetMessage("Please retry from signup page"));
        dispatch(setTime(5000));
        dispatch(togglePopup());
      case 401:
        dispatch(popupSetHeading("OTP is expired"));
        dispatch(popupSetMessage("Please retry from signup page"));
        dispatch(setTime(5000));
        dispatch(togglePopup());
      case 404:
        dispatch(popupSetHeading("No user found to verify"));
        dispatch(popupSetMessage(""));
        dispatch(setTime(5000));
        dispatch(togglePopup());
      case 500:
        dispatch(popupSetHeading(" Trouble connecting to DB "));
        dispatch(popupSetMessage(""));
        dispatch(setTime(5000));
        dispatch(togglePopup());
      case 501:
        dispatch(popupSetHeading(" Situation is not handled in the backend"));
        dispatch(popupSetMessage(""));
        dispatch(setTime(5000));
        dispatch(togglePopup());
      default:
        dispatch(popupSetHeading("No expected response from backend"));
        dispatch(popupSetMessage(""));
        dispatch(setTime(5000));
        dispatch(togglePopup());
    }
    console.log({ "response": response });
  };
  return (
    <>
      {" "}
      <div
        className={`flex justify-center sm:px-32 xmd:px-44 pt-10 sm:pb-20 ${paddingForPage}`}
      >
        <div className="absolute top-8% sm:top-15% backdrop-blur-xl bg-bgLightBlue w-95vw sm:w-auto  py-12 sm:py-24 sm:px-32 rounded-lg shadow-xl">
          <div className=" flex flex-col items-center justify-center gap-8 ">
            <div className="text-center space-y-2">
              <p className="text-xl sm:text-3xl text-primaryBlue font-bold ">
                Enter your OTP
              </p>
              <p className="opacity-40 text-xs sm:text-sm">
                Check your email for 6-DIGIT code
              </p>
            </div>
            <div className=" flex flex-col gap-3">
              <form
                className=" flex flex-col gap-5 items-center "
                onSubmit={handelSubmit}
              >
                <input
                  className="text-xs sm:text-sm py-2 px-2 sm:px-6 w-20rem rounded-lg bg-white text-primaryBlue shadow-sm"
                  type="number"
                  required
                  name="OTP"
                  id="OTP"
                  placeholder="6-DIGIT OTP"
                  onChange={handelChange}
                />
                <button
                  className={`bg-primaryBlue text-xs sm:text-sm rounded-md py-2 sm:py-2 px-10 mt-4  text-white w-20rem
                    ${LoginAndSignupButtonTransition} shadow-md`}
                  type="submit"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVerifyUI;
