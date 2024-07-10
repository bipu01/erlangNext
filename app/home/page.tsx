// import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import CategorySegment from "./CategorySegment";
import HeroSegment from "./HeroSegment";

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
