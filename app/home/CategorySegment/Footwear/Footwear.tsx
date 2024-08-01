import { ProductCluster } from "../../../components/ProductCard/ProductCluster";
import { paddingForProductCard } from "../../../defineSize";
import { productClusterProp } from "../../../declare";
import { product } from "@/app/store/type";
import { useEffect, useState } from "react";
import SmallProductGrid from "@/app/components/SmallProductsGrid/SmallProductGrid";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Footwear = () => {
  const featuredFootwear = useSelector(
    (state: RootState) => state.featuredProductsSlice.featuredJewellery
  );
  const printProductCluster = () => {
    for (let i = 0; i < featuredFootwear.length; i += 2) {
      const pairs: productClusterProp = {
        leftRow: {
          _id: featuredFootwear[i]._id,
          name: featuredFootwear[i].name,
          desc: featuredFootwear[i].desc,
          ratingRate: featuredFootwear[i].ratingRate,
          ratingCount: featuredFootwear[i].ratingCount,
          priceOriginal: featuredFootwear[i].priceOriginal,
          priceCurrent: featuredFootwear[i].priceCurrent,
          img1: featuredFootwear[i].img1,
          img2: featuredFootwear[i].img2,
          img3: featuredFootwear[i].img3,
        },
        rightRow: {
          _id: featuredFootwear[i + 1]._id,
          name: featuredFootwear[i + 1].name,
          desc: featuredFootwear[i + 1].desc,
          ratingRate: featuredFootwear[i + 1].ratingRate,
          ratingCount: featuredFootwear[i + 1].ratingCount,
          priceOriginal: featuredFootwear[i + 1].priceOriginal,
          priceCurrent: featuredFootwear[i + 1].priceCurrent,
          img1: featuredFootwear[i + 1].img1,
          img2: featuredFootwear[i + 1].img2,
          img3: featuredFootwear[i + 1].img3,
        },
      };

      // console.log({ "pairs": pairs });
      return (
        <ProductCluster
          key={pairs.leftRow._id}
          color="blue"
          leftRow={pairs.leftRow}
          rightRow={pairs.rightRow}
        />
      );
    }
  };
  return (
    <div>
      <div className="relative mt-15vh sm:mt-25vh">
        <img
          src="/assets/weavyArch.svg"
          alt="wave"
          className="w-100vw absolute -bottom-1"
        />
      </div>

      <section
        id="dresses"
        className={` bg-bgLightBlue px-10vw pt-3vh pb-5vh relative ${paddingForProductCard} mb-5vh `}
      >
        <p className="  text-primaryBlue text-2xl sm:text-3xl 3xl:text-5xl font-bold w-100% sm:w-70% xmd:w-70% mb-3vh sm:mb-5vh leading-loose">
          <span className="underline">STYLISH AND STRONG:</span> OUR SHOES
          COLLECTION:
        </p>
        <div
          id="container"
          className="grid sm:space-y-16 justify-center  max-w-25rem sm:max-w-100%  mx-1 mb-12 sm:mx-0"
        >
          {featuredFootwear && printProductCluster()}
        </div>
        <h1 className="text-lg mb-4 font-semibold">More of the Footwears:</h1>
        <div>
          {featuredFootwear && (
            <SmallProductGrid products={featuredFootwear.slice(2)} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Footwear;
