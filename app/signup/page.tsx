"use client";
import { useSelector } from "react-redux";
import SignUpUI from "./SignUpUI";
import { RootState } from "@/redux/store";
import OTPVerifyUI from "./OTPVerifyUI";
import Image from "next/image";
import weavyArch from "../../public/assets/weavyArch.svg";
import Popup from "../components/Popups/Popup";

export default function SignUpPage() {
  const OTPUIStatus = useSelector(
    (state: RootState) => state.signUpSlice.OTPUIStatus
  );
  const popup = useSelector((state: RootState) => state.popupSlice.popup);
  const heading = useSelector((state: RootState) => state.popupSlice.heading);
  const message = useSelector((state: RootState) => state.popupSlice.message);
  return (
    <>
      <div className=" bg-bodybg w-full h-93vh relative">
        {popup && <Popup heading={heading} message={message} />}

        <div className="">
          <Image className="rotate-180 " src={weavyArch} alt="wave" />
        </div>
        {OTPUIStatus && <OTPVerifyUI />}
        {!OTPUIStatus && <SignUpUI />}
      </div>
    </>
  );
}
