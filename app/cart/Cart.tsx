"use client";

import { ReactHTMLElement, useEffect, useState } from "react";
import ScrollToTop from "../Functions/ScrollToTop/ScrollToTop";
import Star from "../SVG/Star";
import { CartBuyNowBtn } from "../components/Buttons/Buttons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Delete from "../SVG/Delete";
import { setUser } from "@/redux/features/userSlice";
import {
  popupSetHeading,
  popupSetMessage,
  togglePopup,
} from "@/redux/features/popupSlice";

export default function Cart() {
  const [preventNavigation, setPreventNavigation] = useState(false);
  const dispatch = useDispatch();

  const itemsInCart = useSelector((state: RootState) => state.user.itemsInCart);

  const handleRomoveFromCart = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setPreventNavigation(true);

    const id = e.currentTarget.id.split("=")[1];
    const res = await fetch(`/api/user/cart/removeFromCart?productId=${id}`);
    const data = await res.json();
    const user = data.user;
    dispatch(setUser(user));

    dispatch(popupSetHeading("Item removed from Cart"));
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
    <div className="max-w-65rem">
      <ScrollToTop />
      <div className="flex flex-col gap-4">
        {itemsInCart && itemsInCart.length > 0
          ? itemsInCart
              .slice()
              .reverse()
              .map((item, index) => (
                <Link
                  href={`/product/${item._id}`}
                  key={index}
                  onClick={handleLinkClick}
                >
                  <div className="relative w-full h-full grid grid-cols-4 sm:grid-cols-5 bg-bodybg rounded-lg cursor-pointer">
                    <div className="col-span-1 p-1 sm:p-2 ">
                      <div className=" w-auto sm:w-auto 3xl:w-44 h-28 sm:h-36  rounded-md overflow-hidden ">
                        <img
                          className=" w-full h-full object-cover object-top"
                          src={`${item.img1}`}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className=" col-span-3 sm:col-span-4 flex flex-col gap-1 pl-5 p-1  sm:gap-3 sm:p-2">
                      <div className="flex  items-center sm:items-start ">
                        <p className="w-75%  text-xs sm:text-lg  text-primaryBlue font-semibold line-clamp-1">
                          {item.name}
                        </p>
                        <div className="">
                          <button
                            id={`removeFromCart=${item._id}`}
                            className=" p-2 rounded-md ml-4 "
                            onClick={handleRomoveFromCart}
                          >
                            <Delete
                              borderThickness={2}
                              borderColor="#A60F0F"
                              custom="h-4 w-4 sm:h-6 sm:w-6 absolute top-4 right-10%"
                            />
                          </button>
                        </div>
                      </div>

                      <div
                        id="stars"
                        className="flex  items-baseline mt-2 gap-10vw sm:gap-30vw"
                      >
                        <div id="stars" className="flex gap-1">
                          <Star height={16} width={16} />
                          <Star height={16} width={16} />
                          <Star height={16} width={16} />
                          <Star height={16} width={16} />
                          <Star
                            height={16}
                            width={16}
                            fillColor="transparent"
                          />
                        </div>
                      </div>

                      <div className="relative flex mt-8 sm:mt-10 mr-1 gap-10vw sm:gap-20vw  items-start ">
                        {/* item original and discount price */}
                        <div className=" sm:col-span-1 text-xs md:text-base  flex text-primaryBlue font-semibold justify-start">
                          <p>NPR.</p>
                          <div className="flex gap-1 sm:gap-2">
                            <p className=" line-through opacity-65">
                              {item.priceOriginal}
                            </p>
                            <p>{item.priceCurrent}</p>
                          </div>
                        </div>

                        <div className="">
                          <CartBuyNowBtn
                            text="Buy now"
                            darkBg={true}
                            primary={true}
                          />
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
