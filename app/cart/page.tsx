"use client";

import Cart from "./Cart";
import BackArrow from "../SVG/BackArrow";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, updateCart } from "@/redux/features/userSlice";
import { RootState } from "@/redux/store";
import Popup from "../components/Popups/Popup";
import NotLoggedPopup from "../components/Popups/NotLoggedPopup";
import { BackArrowTransitation } from "../transitionsAndAnimations/transitions";
import SpinningCircle from "../components/LoadingComponents/SpinningCircle";

export default function CartPage() {
  const [showDialouge, setShowDialouge] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfo();
    sessionStorage.setItem("lastVisitedPage", "/cart");
  }, []);

  const getUserInfo = async () => {
    const res = await fetch("/api/user/info");
    const user = await res.json();
    dispatch(setUser(user.message));

    if (!res.ok) {
      if (res.status === 401) {
        setShowDialouge(true);
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  };

  const popup = useSelector((state: RootState) => state.popupSlice.popup);
  const heading = useSelector((state: RootState) => state.popupSlice.heading);
  const message = useSelector((state: RootState) => state.popupSlice.message);
  const notLoggedPopup = useSelector(
    (state: RootState) => state.popupSlice.notLoggedPopup
  );

  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  const isLoading = useSelector(
    (state: RootState) => state.postPopupReducer.loading
  );

  return (
    <div
      className={`bg-bgLightBlue w-screen min-h-90vh overflow-y-scroll  px-2% sm:px-5vw xl:px-12vw 2xl:px-18vw pb-24`}
    >
      {isLoading && <SpinningCircle />}
      {/* Notification popup */}
      <Popup heading={heading} message={message} />
      {!isAuthorized && <NotLoggedPopup />}
      <div className="flex flex-col gap-4 sm:gap-6 xmd:gap-8 ">
        <div className={` h-6 w-6 sm:h-8 sm:w-8 py-3 sm:py-8`}>
          <div className="text-xl text-black/60 font-semibold px-6 mb-4  absolute top-[62px] sm:top-[102px] left-15vw 3xl:left-20vw">
            Cart
          </div>
          <Link
            href="/"
            className={`absolute z-20 top-[60px]  sm:top-[100px]  ${BackArrowTransitation}`}
          >
            <BackArrow
              height={32}
              width={32}
              borderThickness={4}
              borderColor="#1C244B"
            />
          </Link>
        </div>
        <Cart />
      </div>
    </div>
  );
}
