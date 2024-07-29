import PageBreakLine from "../../../components/PageBreakLine/PageBreakLine";
import { ProductCluster } from "../../../components/ProductCard/ProductCluster";
import { paddingForProductCard } from "../../../defineSize";
import { product } from "../../../store/type";
import { productClusterProp } from "../../../declare";
import { useEffect, useState } from "react";
import SmallProductGrid from "@/app/components/SmallProductsGrid/SmallProductGrid";

const Jewellery = () => {
  const [allFeaturedJewellery, setAllFeaturedJewellery] = useState<
    Array<product>
  >([]);

  useEffect(() => {
    const allFeaturedJewelleryString = sessionStorage.getItem(
      "allFeaturedJewellery"
    );
    if (allFeaturedJewelleryString) {
      try {
        setAllFeaturedJewellery(JSON.parse(allFeaturedJewelleryString));
      } catch (e) {
        console.error(
          "Failed to parse allFeaturedJewellery from sessionStorage",
          e
        );
      }
    }
  }, []);

  const printProductCluster = () => {
    if (allFeaturedJewellery) {
      for (let i = 0; i < allFeaturedJewellery.length; i += 2) {
        const pairs: productClusterProp = {
          leftRow: {
            _id: allFeaturedJewellery[i]._id,
            name: allFeaturedJewellery[i].name,
            desc: allFeaturedJewellery[i].desc,
            ratingRate: allFeaturedJewellery[i].ratingRate,
            ratingCount: allFeaturedJewellery[i].ratingCount,
            priceOriginal: allFeaturedJewellery[i].priceOriginal,
            priceCurrent: allFeaturedJewellery[i].priceCurrent,
            img1: allFeaturedJewellery[i].img1,
            img2: allFeaturedJewellery[i].img2,
            img3: allFeaturedJewellery[i].img3,
          },
          rightRow: {
            _id: allFeaturedJewellery[i + 1]._id,
            name: allFeaturedJewellery[i + 1].name,
            desc: allFeaturedJewellery[i + 1].desc,
            ratingRate: allFeaturedJewellery[i + 1].ratingRate,
            ratingCount: allFeaturedJewellery[i + 1].ratingCount,
            priceOriginal: allFeaturedJewellery[i + 1].priceOriginal,
            priceCurrent: allFeaturedJewellery[i + 1].priceCurrent,
            img1: allFeaturedJewellery[i + 1].img1,
            img2: allFeaturedJewellery[i + 1].img2,
            img3: allFeaturedJewellery[i + 1].img3,
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
      return <div>Something went wrong</div>;
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
          {printProductCluster()}
        </div>
        <h1 className="text-lg mb-4 font-semibold">More of the Footwears:</h1>
        <div>
          {allFeaturedJewellery && (
            <SmallProductGrid products={allFeaturedJewellery.slice(2)} />
          )}
        </div>
      </section>
      <PageBreakLine />
    </div>
  );
};

export default Jewellery;
