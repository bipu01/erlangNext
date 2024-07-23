import { ReactHTMLElement, useEffect, useState } from "react";
import ScrollToTop from "../Functions/ScrollToTop/ScrollToTop";
import Star from "../SVG/Star";
import { CartBuyNowBtn } from "../components/Buttons/Buttons";
import { product } from "../store/type";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Cart() {
  const [num, setNum] = useState(0);

  const itemsInCart = useSelector((state: RootState) => state.user.itemsInCart);

  const setOpenedProduct = (item: product) => {
    console.log(item);
    sessionStorage.setItem("openedProduct", JSON.stringify(item));
  };

  return (
    <div className="">
      <ScrollToTop />
      <div className="flex flex-col gap-4">
        {itemsInCart && itemsInCart.length > 0
          ? itemsInCart
              .slice()
              .reverse()
              .map((item, index) => (
                <Link href="/product" key={index}>
                  <div
                    className="relative w-full h-full grid grid-cols-4 sm:grid-cols-5 bg-bodybg rounded-lg cursor-pointer"
                    onClick={() => setOpenedProduct(item)}
                  >
                    <div className="col-span-1 p-1 sm:p-2 ">
                      <div className=" w-full h-28 sm:h-36 3xl:h-44 rounded-md overflow-hidden ">
                        <img
                          className=" w-full h-full object-cover object-top"
                          src={`${item.img1}`}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className=" col-span-3 sm:col-span-4 flex flex-col gap-1 pl-5 p-1  sm:gap-3 sm:p-2">
                      <div className="">
                        <p className=" text-xs sm:text-xl  text-primaryBlue font-semibold">
                          {item.name}
                        </p>
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

                      <div className="absolute bottom-2 grid grid-cols-2 gap-8vw sm:gap-20vw items-baseline">
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
