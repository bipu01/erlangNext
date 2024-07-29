"use client";
import Link from "next/link";
import { product } from "../store/type";
import Star from "../SVG/Star";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SmallProductGrid from "../components/SmallProductsGrid/SmallProductGrid";

export type Rating = {
  ratingRate: number;
  ratingCount: number;
};
export default function SearchedProductsPage() {
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [itemFound, setItemFound] = useState(false);

  useEffect(() => {
    try {
      setSearchedProducts(
        JSON.parse(sessionStorage.getItem("searchedProducts") || "")
      );

      if (
        JSON.parse(sessionStorage.getItem("searchedProducts") || "") == null
      ) {
        setItemFound(false);
      } else {
        setItemFound(true);
      }
    } catch (error) {
      setItemFound(false);
      console.log("No item found");
    }
  }, []);

  const PrintNotFoundMessage = () => {
    return (
      <div className="mt-16">
        <h1 className="text-2xl font-medium text-center text-primaryBlue opacity-40">
          Sorry!! <br />
          No such product found
        </h1>
      </div>
    );
  };

  return (
    <div className=" bg-bodybg min-h-screen ">
      <div className="px-2 sm:px-5 md:px-10 pb-15vh">
        <div className="py-12 pt-16">
          <h1 className="text-2xl font-semibold text-primaryBlue">
            Similar results:
          </h1>
        </div>
        <div>
          {itemFound ? (
            <SmallProductGrid products={searchedProducts} />
          ) : (
            <PrintNotFoundMessage />
          )}
        </div>
      </div>
    </div>
  );
}
