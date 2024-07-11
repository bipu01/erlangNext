// import { Link } from "react-router-dom";
import Link from "next/link";
import { LikeBtn } from "../../SVG/LikeBtn";
import { ProductCardProp } from "../../declare";
import {
  productCardNumSize,
  sizeOfMajorText,
  sizeOfPunchHole,
  sizeOfTitleText,
} from "../../defineSize";
import { AddToCartButton } from "../Buttons/Buttons";
import Image from "next/image";

// import { openProductMenu } from "./productHardHandler";

export const ProductCardLeftImg = (prop: ProductCardProp) => {
  const sendToSessionToken = () => {
    sessionStorage.setItem("openedProduct", JSON.stringify(prop));
  };

  return (
    <div
      id={"img" + prop._id}
      className=" row-span-2 sm:row-span-2 col-span-3 sm:col-span-1 bg-slate-500 mt-6 relative sm:shadow-customRight hover:cursor-pointer "
      onClick={sendToSessionToken}
    >
      <div className="absolute z-30 -top-3% 4xl:-top-2% flex w-100% gap-30% left-25%">
        <div
          className={`${sizeOfPunchHole} ${
            prop.holeColor === "pink" ? "bg-bgLightPink" : "bg-bgLightBlue"
          } rounded-full border-6 border-bodybg shadow-inner`}
        ></div>
        <div
          className={`${sizeOfPunchHole} ${
            prop.holeColor === "pink" ? "bg-bgLightPink" : "bg-bgLightBlue"
          } rounded-full border-6 border-bodybg shadow-inner`}
        ></div>
      </div>
      <Link href={"/product"}>
        {/* <img
          className="h-100% w-100% object-cover relative z-20 rounded-sm"
          src={prop.img1}
          alt={prop.img1}
        /> */}
        <Image
          className="h-100% w-100% object-cover relative z-20 rounded-sm"
          src={prop.img1 || ""}
          alt={prop.img1 || ""}
        />
      </Link>
    </div>
  );
};
export const ProductCardRightImg = (prop: ProductCardProp) => {
  const sendToSessionToken = () => {
    sessionStorage.setItem("openedProduct", JSON.stringify(prop));
  };
  return (
    <div
      id={"img" + prop._id}
      className="row-span-2  sm:row-span-2 col-span-3 sm:col-span-1 bg-slate-500 relative mb-6 hover:cursor-pointer"
      onClick={sendToSessionToken}
    >
      <div className="absolute z-30 -bottom-3% sm:bottom-1% flex w-100% gap-30% left-25%">
        <div
          className={`${sizeOfPunchHole} ${
            prop.holeColor === "pink" ? "bg-bgLightPink" : "bg-bgLightBlue"
          } rounded-full border-6 border-bodybg shadow-inner`}
        ></div>
        <div
          className={`${sizeOfPunchHole} ${
            prop.holeColor === "pink" ? "bg-bgLightPink" : "bg-bgLightBlue"
          } rounded-full border-6 border-bodybg shadow-inner`}
        ></div>
      </div>
      <Link href="/product">
        {/* <img
          className="h-100% sm:h-96%  w-100% object-cover relative z-20 rounded-sm "
          src={prop.img1}
          alt={prop.img1}
        /> */}
        <Image
          className="h-100% sm:h-96%  w-100% object-cover relative z-20 rounded-sm "
          src={prop.img1 || ""}
          alt={prop.img1 || ""}
        />
      </Link>
    </div>
  );
};

export const DataOfRightImg = (prop: ProductCardProp) => {
  return (
    <div
      id={prop._id}
      className={`row-span-2 sm:row-span-1 shadow-customLeft relative z-0 bg-bodybg px-7% sm:pr-3% sm:pl-20% py-10% sm:py-4%  hover:cursor-pointer
        flex flex-col justify-between rounded-tr-3xl rounded-br-3xl sm:rounded-tl-full sm:rounded-bl-full
      after:content-[''] after:absolute after:-bottom-0 after:shadow-customLeft after:right-100% sm:after:left-100% after:h-100% after:w-180% after:bg-bodybg`}
      // onClick={}
    >
      <div
        className={`space-y-2 xl:space-y-0 after:absolute after:content-[''] after:h-0.5 after:w-90% after:hidden sm:after:block 
        after:bg-black after:opacity-20 after:z-40 before:absolute before:content-[''] before:h-100% before:w-4 
        before:bg-bodybg before:-left-3% sm:before:left-98% 4xl:before:left-99% before:z-30 before:top-0`}
      >
        <div
          className={`hidden sm:block absolute ${sizeOfPunchHole} ${
            prop.holeColor === "pink" ? "bg-bgLightPink" : "bg-bgLightBlue"
          }  rounded-full border-6 border-bodybg shadow-inner -top-4% 4xl:-top-3% left-10%`}
        ></div>
        <div className=" space-y-10% sm:space-y-1">
          <h3
            id="productName"
            className={`relative font-medium z-20 whitespace-normal  ${sizeOfTitleText}`}
          >
            {prop.name}
          </h3>
          <div
            id="rating"
            className={`flex gap-2  ${productCardNumSize} items-baseline font-semibold justify-between`}
          >
            <div id="stars" className="flex gap-2 items-baseline">
              <div id="stars" className="flex">
                <Image src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <Image src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <Image src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <Image src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <Image src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                {/* <img src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <img src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <img src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <img src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <img src="/icons/unfilledStar.svg" alt="" className=" sm:h-4" /> */}
              </div>
              {prop.ratingRate}
            </div>
            <div>
              <h3
                id="price"
                className={`hidden sm:block font-semibold ${productCardNumSize}`}
              >
                NPR.{prop.priceCurrent}
              </h3>
            </div>
          </div>
          <div className=" overflow-clip h-20vh sm:h-0">
            <p className="sm:hidden text-xs line-clamp-[8]">{prop.desc}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between mt-2">
          <h3
            id="price"
            className={`sm:hidden text-lg font-semibold xl:text-2xl ${sizeOfMajorText}`}
          >
            NPR.{prop.priceCurrent}
          </h3>
          <div className="sm:hidden h-6 w-6 3xl:h-8 3xl:w-8">
            <LikeBtn fillColor="#FFF9EF" />
          </div>
        </div>
        <div className="sm:hidden bg-black opacity-20 h-0.5 w-100% mb-2"></div>
        <div className="flex justify-between items-center ">
          <div className="hidden sm:block h-6 w-6 3xl:h-8 3xl:w-8">
            <LikeBtn custom="h-6 w-6 " fillColor="#FFF9EF" />
          </div>
          <AddToCartButton
            _id={prop._id}
            darkBg={true}
            text="Add to cart"
            primary={true}
            custom="w-100% sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export const DataOfLeftImg = (prop: ProductCardProp) => {
  // console.log({ "From DataOfLeftImg": "", ProductCardProp: prop });
  return (
    <div
      id={prop._id}
      className={`row-span-2 sm:row-span-1  shadow-customRight relative z-0 bg-bodybg px-7% sm:py-4% flex flex-col justify-between hover:cursor-pointer
      sm:pl-3% sm:pr-20% py-10% rounded-tr-3xl rounded-br-3xl rounded-md sm:rounded-tr-full sm:rounded-br-full 
      after:content-[''] after:absolute after:-top-0 after:shadow-customRight after:right-100% after:h-100% after:w-180% after:bg-bodybg`}
      // onClick={openProductMenu}
    >
      <div
        className={`space-y-2 xl:space-y-0 after:absolute after:content-[''] after:h-0.5 after:w-90% after:hidden sm:after:block
        after:bg-black after:opacity-20 after:z-40 before:absolute before:content-[''] before:h-100% before:w-4 before:bg-bodybg 
        before:-left-2 before:z-30 before:top-0`}
      >
        <div
          className={`hidden sm:block absolute ${sizeOfPunchHole} ${
            prop.holeColor === "pink" ? "bg-bgLightPink" : "bg-bgLightBlue"
          }  rounded-full border-6 border-bodybg shadow-inner -top-4% 4xl:-top-3% right-10% `}
        ></div>

        <div className=" space-y-10% sm:space-y-1">
          <h3
            id="productName"
            className={`relative font-medium z-20 whitespace-normal ${sizeOfTitleText}`}
          >
            {prop.name}
          </h3>
          <div
            id="rating"
            className={`flex gap-2 ${productCardNumSize} items-baseline font-semibold justify-between`}
          >
            <div className="flex gap-2 items-baseline">
              <div id="stars" className="flex">
                <Image src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <Image src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <Image src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <Image src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <Image src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                {/* <img src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <img src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <img src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <img src="/icons/filledStar.svg" alt="" className=" sm:h-4" />
                <img src="/icons/unfilledStar.svg" alt="" className=" sm:h-4" /> */}
              </div>
              {prop.ratingRate}
            </div>
            <div>
              <h3
                id="price"
                className={`hidden sm:block font-semibold ${productCardNumSize}`}
              >
                NPR.{prop.priceCurrent}
              </h3>
            </div>
          </div>
          <div className=" overflow-clip h-20vh sm:h-0">
            <p className="sm:hidden text-xs line-clamp-[8]">{prop.desc}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between mt-2">
          <h3
            id="price"
            className={`sm:hidden text-lg font-semibold xl:text-2xl ${sizeOfMajorText}`}
          >
            NPR.{prop.priceCurrent}
          </h3>
          <div className="sm:hidden h-6 w-6 3xl:h-8 3xl:w-8">
            <LikeBtn fillColor="#FFF9EF" />
          </div>
        </div>
        <div className="sm:hidden bg-black opacity-20 h-0.5 w-100% mb-2"></div>
        <div className="flex justify-between items-center ">
          <div className="hidden sm:block h-6 w-6 3xl:h-8 3xl:w-8">
            <LikeBtn custom="h-6 w-6 " fillColor="#FFF9EF" />
          </div>
          <AddToCartButton
            _id={prop._id}
            darkBg={true}
            text="Add to cart"
            primary={true}
            custom="w-100% sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

//This includes group of two product arranged in grid
