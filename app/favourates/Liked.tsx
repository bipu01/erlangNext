"use client";

import ScrollToTop from "../Functions/ScrollToTop/ScrollToTop";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Delete from "../SVG/Delete";
import { useEffect, useState } from "react";
import { setUser } from "@/redux/features/userSlice";
import {
  popupSetHeading,
  popupSetMessage,
  togglePopup,
} from "@/redux/features/popupSlice";

export default function Liked() {
  const [preventNavigation, setPreventNavigation] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();

  const likedProducts = useSelector(
    (state: RootState) => state.user.likedProducts
  );

  const handleRomoveFromLiked = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setPreventNavigation(true);

    const id = e.currentTarget.id.split("=")[1];
    const res = await fetch(`/api/user/liked/removeFromLiked?productId=${id}`);
    const data = await res.json();
    const user = data.user;
    dispatch(setUser(user));
    setShowOptions(false);

    dispatch(popupSetHeading("Item removed from Liked"));
    dispatch(popupSetMessage(""));
    dispatch(togglePopup());
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (preventNavigation) {
      e.preventDefault();
      setPreventNavigation(false);
    }
  };

  return (
    <div className=" px-1 py-2 flex  justify-center">
      <ScrollToTop />
      <div className="flex flex-col gap-4 justify-center">
        {likedProducts && likedProducts.length > 0
          ? likedProducts
              .slice()
              .reverse()
              .map((item, index) => (
                <Link
                  href={`/product/${item._id}`}
                  key={index}
                  onClick={handleLinkClick}
                >
                  <div
                    className={`relative w-95vw sm:w-80vw lg:w-70vw h-full grid grid-cols-4 sm:grid-cols-5 ${
                      showOptions ? "bg-bodybg/30" : "bg-bodybg "
                    }  rounded-lg cursor-pointer`}
                  >
                    <div className="col-span-1 p-1 sm:p-2 ">
                      <div className="  h-16 w-16 sm:h-24  sm:w-24  rounded-md overflow-hidden ">
                        <img
                          className=" w-full h-full object-cover object-top"
                          src={`${item.img1}`}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className=" col-span-3 sm:col-span-4 flex flex-col gap-1 pl-5 p-1  sm:gap-1 sm:p-2">
                      <div className="flex  items-center sm:items-start ">
                        <p className="w-75%  text-xs sm:text-sm  text-primaryBlue font-semibold line-clamp-1">
                          {item.name}
                        </p>
                        <div className="">
                          <button
                            className=" p-2 rounded-md ml-4 "
                            onClick={(
                              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                            ) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setPreventNavigation(true);
                              setShowOptions(!showOptions);
                            }}
                          >
                            <img
                              src="/icons/threeDot.svg"
                              alt="threeDot"
                              className="absolute right-3 sm:right-5 sm:top-4 "
                            />
                          </button>
                        </div>
                        {showOptions ? (
                          <div className="absolute right-8 top-3 sm:right-10 bg-white rounded-md py-1 px-1 shadow-md items-start">
                            <button
                              id={`removeFromLiked=${item._id}`}
                              className="bg-darkRed text-white px-3 py-1 text-xs 2xl:text-sm rounded-md"
                              onClick={handleRomoveFromLiked}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div className="relative flex mt-3 sm:mt-10 mr-1 gap-10vw sm:gap-20vw  items-start ">
                        <div className=" sm:col-span-1 text-xs 2xl:text-xs  flex text-primaryBlue font-normal justify-start">
                          <p>NPR.</p>
                          <div className="flex gap-1 sm:gap-2">
                            <p className=" line-through opacity-65">
                              {item.priceOriginal}
                            </p>
                            <p>{item.priceCurrent}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
          : ""}
      </div>
    </div>
  );
}
