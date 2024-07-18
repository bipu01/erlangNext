"use client";

import Image from "next/image";

// import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import CategorySegment from "./home/CategorySegment/CategorySegment";
import HeroSegment from "./home/HeroSegment/HeroSegment";

const Homepage = () => {
  useEffect(() => {
    const lastScrollPosition = sessionStorage.getItem("homeLastScrollPosition");
    console.log({ "lastScrollPosition": lastScrollPosition });
  }, []);

  return (
    <section className=" text-primaryBlue overflow-x-hidden bg-bodybg">
      <HeroSegment />
      <CategorySegment />
    </section>
  );
};

export default Homepage;
