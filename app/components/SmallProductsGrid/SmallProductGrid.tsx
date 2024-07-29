"use client";

import Star from "@/app/SVG/Star";
import { Rating } from "@/app/searchedProducts/page";
import { product } from "@/app/store/type";
import Link from "next/link";
import React from "react";
import { LikeButton } from "../Buttons/Buttons";

interface smallProductGridProp {
  products: product[];
}

const SmallProductGrid: React.FC<smallProductGridProp> = ({ products }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("clicked onto new small conponent");
  };

  const renderStarRating = (prop: Rating) => {
    const stars = [];
    for (let i = 0; i < Math.ceil(prop.ratingRate); i++) {
      stars.push(<Star key={i + 900} />);
    }
    const emptyStars = 5 - Math.ceil(prop.ratingRate);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={i} fillColor="transparent" />);
    }
    return stars;
  };
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-10 ">
      {products &&
        products.map((product: product) => (
          <Link href={`/product/${product._id}`} key={product._id}>
            <div
              id={product._id}
              className="bg-bodybg shadow-customSearchProduct rounded-lg  p-2 pb-3 sm:pb-6 hover:cursor-pointer"
              onClick={handleClick}
            >
              <div className="rounded-lg w-full ">
                <div className="h-10rem sm:h-25rem">
                  <img
                    className=" w-100% h-100% aspect-square object-cover object-top rounded-lg "
                    src={product.img1}
                    alt={product.img1}
                  />
                </div>
              </div>
              <div className="">
                <div className="">
                  <p className=" text-xs sm:text-lg font-semibold pt-4 px-2 text-primaryBlue line-clamp-1">
                    {product.name}
                  </p>
                </div>
                <div className=" flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between pt-4 px-2">
                  <div className=" flex gap-4 opacity-70 items-center ">
                    <div className=" flex gap-1">
                      {renderStarRating({
                        ratingRate: product.ratingRate,
                        ratingCount: product.ratingCount,
                      } as Rating)}
                    </div>
                    <p className=" text-xs sm:text-base font-bold opacity-100 text-primaryBlue">
                      {product.ratingCount}
                    </p>
                  </div>
                  <div className="text-xs sm:text-base font-normal opacity-70 flex justify-between  ">
                    <p className=" "> NPR {product.priceCurrent}</p>
                    <div className="sm:hidden">
                      <LikeButton _id={product._id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default SmallProductGrid;
