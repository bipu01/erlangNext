"use client";

import { useEffect } from "react";
import CategorySegment from "./home/CategorySegment/CategorySegment";
import HeroSegment from "./home/HeroSegment/HeroSegment";
import Popup from "./components/Popups/Popup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NotLoggedPopup from "./components/Popups/NotLoggedPopup";
import { setUser } from "@/redux/features/userSlice";

const Homepage = () => {
  const popup = useSelector((state: RootState) => state.popupSlice.popup);
  const notLoggedPopup = useSelector(
    (state: RootState) => state.popupSlice.notLoggedPopup
  );
  const heading = useSelector((state: RootState) => state.popupSlice.heading);
  const message = useSelector((state: RootState) => state.popupSlice.message);
  const dispatch = useDispatch();

  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );

  useEffect(() => {
    const lastScrollPosition = sessionStorage.getItem("homeLastScrollPosition");
    console.log({ "lastScrollPosition": lastScrollPosition });

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

  return (
    <section className=" text-primaryBlue overflow-x-hidden bg-bodybg ">
      <Popup heading={heading} message={message} />

      {notLoggedPopup && <NotLoggedPopup />}
      <HeroSegment />
      <CategorySegment />
    </section>
  );
};

export default Homepage;
