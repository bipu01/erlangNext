import { ReactHTMLElement, useState } from "react";
import ScrollToTop from "../Functions/ScrollToTop/ScrollToTop";
import Star from "../SVG/Star";
import { cartItems } from "./cartCluster";
import { BuyNowBtn } from "../components/Buttons/Buttons";
import Image from "next/image";
import { product } from "../store/type";
import { ProductCardProp } from "../declare";
import Link from "next/link";

export default function Cart() {
  const [num, setNum] = useState(0);

  const setOpenedProduct = (item: product) => {
    console.log(item);
    sessionStorage.setItem("openedProduct", JSON.stringify(item));
    sessionStorage.setItem("lastVisitedPage", "cart");
  };

  return (
    <div className="">
      <ScrollToTop />
      <div className="flex flex-col gap-4">
        {cartItems.map((item, index) => (
          <Link href="/product" key={index}>
            <div
              className="relative w-full h-full grid grid-cols-4 sm:grid-cols-5 bg-bodybg rounded-lg cursor-pointer"
              onClick={() => setOpenedProduct(item)}
            >
              <div className="col-span-1 p-1 sm:p-2 ">
                <div className=" w-full h-28 sm:h-10rem rounded-md overflow-hidden ">
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

                <div id="stars" className="flex gap-2 items-baseline mt-2">
                  <div id="stars" className="flex gap-2">
                    <Star height={20} width={20} />
                    <Star height={20} width={20} />
                    <Star height={20} width={20} />
                    <Star height={20} width={20} />
                    <Star height={20} width={20} fillColor="transparent" />
                  </div>
                </div>

                <div className="absolute bottom-2 grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-8 items-baseline">
                  {/* quantity increase and decrease */}
                  <div className=" flex gap-6 items-center justify-around">
                    <button
                      className=" font-bold sm:text-3xl"
                      // onClick={() => {
                      //   if (num >= 0) {
                      //     setNum(num - 1);
                      //   }
                      // }}
                    >
                      -
                    </button>
                    <p className="text-xs sm:text-base xmd:text-xl flex items-center rounded-md border-2   px-4 py-1 bg-bgLightBlue">
                      {num}
                    </p>
                    <button
                      className=" font-semibold sm:text-3xl"
                      // onClick={() => {
                      //   if (num <= 20) {
                      //     setNum(num + 1);
                      //   }
                      // }}
                    >
                      +
                    </button>
                  </div>
                  {/* item original and discount price */}
                  <div className=" sm:col-span-1 text-xs sm:text-base xmd:text-xl flex text-primaryBlue font-semibold justify-center">
                    <p>NPR.</p>
                    <div className="flex gap-1 sm:gap-2">
                      <p className=" line-through opacity-65">
                        {item.priceOriginal}
                      </p>
                      <p>{item.priceCurrent}</p>
                    </div>
                  </div>
                  <div className="">
                    <BuyNowBtn text="Buy now" darkBg={true} primary={true} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
