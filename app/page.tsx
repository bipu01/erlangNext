"use client";

import { useEffect } from "react";
import CategorySegment from "./home/CategorySegment/CategorySegment";
import HeroSegment from "./home/HeroSegment/HeroSegment";
import Popup from "./components/Popups/Popup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Homepage = () => {
  const popup = useSelector((state: RootState) => state.popupSlice.popup);
  const heading = useSelector((state: RootState) => state.popupSlice.heading);
  const message = useSelector((state: RootState) => state.popupSlice.message);

  useEffect(() => {
    const lastScrollPosition = sessionStorage.getItem("homeLastScrollPosition");
    console.log({ "lastScrollPosition": lastScrollPosition });
  }, []);

  return (
    <section className=" text-primaryBlue overflow-x-hidden bg-bodybg">
      {popup && <Popup heading={heading} message={message} />}
      <HeroSegment />
      <CategorySegment />
    </section>
  );
};

export default Homepage;
