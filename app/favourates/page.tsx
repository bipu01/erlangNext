"use client";

import Liked from "./Liked";
import BackArrow from "../SVG/BackArrow";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, updateCart } from "@/redux/features/userSlice";
import Popup from "../components/Popups/Popup";
import { RootState } from "@/redux/store";
import NotLoggedPopup from "../components/Popups/NotLoggedPopup";

export default function CartPage() {
  const [showDialouge, setShowDialouge] = useState(false);
  const dispatch = useDispatch();

  const notLoggedPopup = useSelector(
    (state: RootState) => state.popupSlice.notLoggedPopup
  );

  useEffect(() => {
    getUserInfo();
    sessionStorage.setItem("lastVisitedPage", "/favourates");
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

  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  return (
    <div
      className={`bg-bgLightBlue w-screen min-h-90vh overflow-y-scroll  px-2% sm:px-5vw xl:px-12vw 2xl:px-18vw pb-24`}
    >
      {/* {popup && <Popup heading={heading} message={message} />}
      {!isAuthorized && <NotLoggedPopup />} */}

      {popup && isAuthorized && <Popup heading={heading} message={message} />}
      {!isAuthorized && <NotLoggedPopup />}

      <div className="flex flex-col gap-4 sm:gap-6 xmd:gap-8 ">
        <div className=" h-6 w-6 sm:h-8 sm:w-8 py-3 sm:py-8">
          <Link href="/" className="">
            <BackArrow borderThickness={4} borderColor="#1C244B" />
          </Link>
        </div>
        <Liked />
      </div>
    </div>
  );
}
