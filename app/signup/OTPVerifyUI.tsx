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

      case 404:
        dispatch(popupSetHeading("Something went wrong"));
        dispatch(popupSetMessage("Please retry from signup page"));
        dispatch(setTime(5000));
        dispatch(togglePopup());
      case 401:
        dispatch(popupSetHeading("OTP is expired"));
        dispatch(popupSetMessage("Please retry from signup page"));
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
            <div className="">
              <p className="text-xl sm:text-3xl text-primaryBlue font-bold ">
                Enter your OTP
              </p>
            </div>
            <div className=" flex flex-col gap-3">
              <form
                className=" flex flex-col gap-5 items-center "
                onSubmit={handelSubmit}
              >
                <input
                  className="text-xs sm:text-sm py-1 sm:py-1.5 px-2 sm:px-6 w-15rem sm:w-20rem rounded-lg bg-white text-primaryBlue "
                  type="number"
                  required
                  name="OTP"
                  id="OTP"
                  placeholder="6-DIGIT OTP"
                  onChange={handelChange}
                />
                <button
                  className="bg-primaryBlue text-xs sm:text-lg rounded-3xl py-2 sm:py-1.5 px-10 mt-4  text-white sm:w-1/2 hover:text-white hover:bg-primaryBlue w-15rem"
                  // onClick={handleVerify}
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
