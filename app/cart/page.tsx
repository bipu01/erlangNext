"use client";

// import { Link } from "react-router-dom";
import { paddingForPage } from "../defineSize";
import Cart from "./Cart";
import BackArrow from "../SVG/BackArrow";
import Link from "next/link";

export default function CartPage() {
  return (
    <div
      className={`bg-bgLightBlue w-screen h-screen overflow-y-scroll  ${paddingForPage}`}
    >
      <div className="flex flex-col gap-4 sm:gap-6 xmd:gap-8 ">
        <div className=" h-5 w-5 sm:h-8 sm:w-8 py-3 sm:py-8">
          <Link href="/">
            <BackArrow borderThickness={4} borderColor="#1C244B" />
          </Link>
        </div>
        <div className=" ">
          <Cart />
        </div>
      </div>
    </div>
  );
}
