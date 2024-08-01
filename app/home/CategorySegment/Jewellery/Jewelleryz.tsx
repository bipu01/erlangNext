import PageBreakLine from "../../../components/PageBreakLine/PageBreakLine";
import { ProductCluster } from "../../../components/ProductCard/ProductCluster";
import { paddingForProductCard } from "../../../defineSize";
import { product } from "../../../store/type";
import { productClusterProp } from "../../../declare";
import { useEffect, useState } from "react";
import SmallProductGrid from "@/app/components/SmallProductsGrid/SmallProductGrid";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Jewellery = () => {
  const featuredJewellery = useSelector(
    (state: RootState) => state.featuredProductsSlice.featuredJewellery
  );

  const printProductCluster = () => {
    for (let i = 0; i < featuredJewellery.length; i += 2) {
      const pairs: productClusterProp = {
        leftRow: {
          _id: featuredJewellery[i]._id,
          name: featuredJewellery[i].name,
          desc: featuredJewellery[i].desc,
          ratingRate: featuredJewellery[i].ratingRate,
          ratingCount: featuredJewellery[i].ratingCount,
          priceOriginal: featuredJewellery[i].priceOriginal,
          priceCurrent: featuredJewellery[i].priceCurrent,
          img1: featuredJewellery[i].img1,
          img2: featuredJewellery[i].img2,
          img3: featuredJewellery[i].img3,
        },
        rightRow: {
          _id: featuredJewellery[i + 1]._id,
          name: featuredJewellery[i + 1].name,
          desc: featuredJewellery[i + 1].desc,
          ratingRate: featuredJewellery[i + 1].ratingRate,
          ratingCount: featuredJewellery[i + 1].ratingCount,
          priceOriginal: featuredJewellery[i + 1].priceOriginal,
          priceCurrent: featuredJewellery[i + 1].priceCurrent,
          img1: featuredJewellery[i + 1].img1,
          img2: featuredJewellery[i + 1].img2,
          img3: featuredJewellery[i + 1].img3,
        },
      };

      // console.log({ "pairs": pairs });
      return (
        <ProductCluster
          key={pairs.leftRow._id}
          color="pink"
          leftRow={pairs.leftRow}
          rightRow={pairs.rightRow}
        />
      );
    }
  };
  return (
    <div>
      <div className="relative mt-10vh sm:mt-25vh">
        <img
          src="/assets/weavyArchPink.svg"
          alt="wave"
          className="w-100vw absolute -bottom-1"
        />
      </div>
      <section
        id="dresses"
        className={` bg-bgLightPink px-10vw pt-3vh pb-5vh relative ${paddingForProductCard} mb-5vh `}
      >
        <h1 className=" text-primaryBlue text-2xl sm:text-3xl 3xl:text-5xl font-bold w-100% sm:w-70% xmd:w-70% mb-3vh sm:mb-5vh leading-loose">
          <span className="underline">DAZZLING EARRINGS</span> FOR EVERY
          OCCASION:
        </h1>
        <div
          id="container"
          className="grid space-y-16 justify-center items-center max-w-25rem sm:max-w-100% mx-1 mb-12 sm:mx-0"
        >
          {featuredJewellery && printProductCluster()}
        </div>
        <h1 className="text-lg mb-4 font-semibold">More of the Footwears:</h1>
        <div>
          {featuredJewellery && (
            <SmallProductGrid products={featuredJewellery.slice(2)} />
          )}
        </div>
      </section>
      <PageBreakLine />
    </div>
  );
};

export default Jewellery;
