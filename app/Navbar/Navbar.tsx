"use client";
import Link from "next/link";
import Search from "../components/Search";
import Hamburger from "../components/Hamburger";
import Image from "next/image";
import { LikeBtn } from "../SVG/LikeBtn";

const Navbar = () => {
  return (
    <div className=" sticky top-0 z-50 ">
      <div className="  flex justify-around sm:justify-between items-center pt-1 px-2 sm:px-5 md:px-10 bg-bodybg ">
        <div className=" flex gap-2 xmd:gap-10 items-center">
          <Link href={"/"}>
            <div className=" h-12 sm:h-16 aspect-square">
              {/* <img
                className=" h-full w-full object-cover"
                src="./assets/logo.svg"
                alt=""
              /> */}
              <img
                className=" h-full w-full object-cover"
                src="./assets/logo.svg"
                alt=""
              />
            </div>
          </Link>
          <div className="">
            <Search />
          </div>
        </div>
        {/* navlinks */}
        <div className=" flex gap-5 xmd:gap-6  items-center">
          <div className="hidden sm:flex gap-4 text-sm font-medium sm:text-base xmd:text-xl xmd:gap-10 sm:font-normal items-center ">
            <div className="">
              <Link href="/">Home</Link>
            </div>
            {/* <div className="">
              <Link href="/contact">Contact us</Link>
            </div> */}
            <div className="">
              <Link href="/cart">
                <div className="flex gap-1 items-center">
                  <p>Cart</p>
                  <div className=" relative">
                    <img
                      className=" sm:h-4 xmd:h-6"
                      src="./assets/cart.svg"
                      alt=""
                    />
                    <span className="absolute bg-red-500 rounded-full h-3 aspect-square xmd:text-[10px]  flex items-center justify-center -top-2  -right-2 text-xs xmd:text-lg xmd:h-5 sm:-top-3 sm:-right-2 xmd:-right-3 ">
                      2
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="">
              <Link href="/favourates">
                <div className="flex gap-1 items-center">
                  <p> Fav</p>
                  <div className=" relative">
                    {/* <img
                      className=" sm:h-4 xmd:h-6"
                      src="./icons/fav.png"
                      alt=""
                    /> */}
                    <LikeBtn
                      borderThickness={1.5}
                      width={23}
                      height={20}
                      fillColor="#1C244B"
                    />
                  </div>
                </div>
              </Link>
            </div>
            <div className="">
              <Link href="/login">
                <img
                  className="h-7 aspect-square sm:h-6 xmd:h-9"
                  src="./assets/userr.svg"
                  alt=""
                />
              </Link>
            </div>
          </div>
          {/* icons of links to show in mobile screen */}
          <div className=" pl-2">
            <Link href="/">
              <div className=" block sm:hidden">
                <img
                  className="w-5 aspect-auto"
                  src="/icons/home1.svg"
                  alt=""
                />
              </div>
            </Link>
          </div>
          <div className="block sm:hidden relative">
            <Link href="/cart">
              <img className="w-5 aspect-auto" src="./assets/cart.svg" alt="" />
              <span className="absolute bg-red-500 rounded-full h-3 aspect-square text-[10px]  flex items-center  justify-center -top-2  -right-2 sm:text-lg sm:h-5 sm:-top-3 sm:-right-3 ">
                2
              </span>
            </Link>
          </div>
          {/* <div className="block sm:hidden ">
            <Link href="/postProducts">
              <img
                className=" w-7 aspect-auto"
                src="./assets/userr.svg"
                alt=""
              />
            </Link>
          </div> */}
          <div className=" ">
            <Hamburger />
          </div>
        </div>
      </div>
      <div className=" flex justify-center">
        <div className=" bg-black opacity-15 w-[95%] h-[1px] sm:h-[2px] rounded-md -z-10 "></div>
      </div>
    </div>
  );
};

export default Navbar;
