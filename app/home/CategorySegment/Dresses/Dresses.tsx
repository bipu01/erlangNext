// import { useSelector } from "react-redux";
import PageBreakLine from "../../../components/PageBreakLine/PageBreakLine";
import { ProductCluster } from "../../../components/ProductCard/ProductCluster";
import { paddingForProductCard } from "../../../defineSize";
import SortByPanel from "../../SortByPanel/SortByPanel";
import { product } from "../../../store/type";
import { productClusterProp } from "../../../declare";

import weavyArch from "../../../../public/assets/weavyArch.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Dresses = () => {
  const [allFeaturedDress, setAllFeaturedDress] = useState<Array<product>>([]);
  const dataFound = useSelector(
    (state: RootState) => state.dataFetchReducer.isDataFetched
  );

  useEffect(() => {
    const allFeaturedDressString = sessionStorage.getItem("allFeaturedDress");
    // console.log({ allFeaturedDressString: allFeaturedDressString });
    if (allFeaturedDressString) {
      // console.log("AllFeaturedDress found");
      try {
        setAllFeaturedDress(JSON.parse(allFeaturedDressString));
      } catch (e) {
        console.error(
          "Failed to parse allFeaturedDress from sessionStorage",
          e
        );
      }
    }
  }, []);

  const printProductCluster = () => {
    if (allFeaturedDress) {
      for (let i = 0; i < allFeaturedDress.length; i += 2) {
        const pairs: productClusterProp = {
          leftRow: {
            _id: allFeaturedDress[i]._id,
            name: allFeaturedDress[i].name,
            desc: allFeaturedDress[i].desc,
            ratingRate: allFeaturedDress[i].ratingRate,
            ratingCount: allFeaturedDress[i].ratingCount,
            priceOriginal: allFeaturedDress[i].priceOriginal,
            priceCurrent: allFeaturedDress[i].priceCurrent,
            img1: allFeaturedDress[i].img1,
            img2: allFeaturedDress[i].img2,
            img3: allFeaturedDress[i].img3,
          },
          rightRow: {
            _id: allFeaturedDress[i + 1]._id,
            name: allFeaturedDress[i + 1].name,
            desc: allFeaturedDress[i + 1].desc,
            ratingRate: allFeaturedDress[i + 1].ratingRate,
            ratingCount: allFeaturedDress[i + 1].ratingCount,
            priceOriginal: allFeaturedDress[i + 1].priceOriginal,
            priceCurrent: allFeaturedDress[i + 1].priceCurrent,
            img1: allFeaturedDress[i + 1].img1,
            img2: allFeaturedDress[i + 1].img2,
            img3: allFeaturedDress[i + 1].img3,
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
      return <div>Something went wrong</div>;
    }
  };

  return (
    <div>
      <div className="relative mt-15vh sm:mt-25vh">
        <Image
          src={weavyArch}
          alt="wave"
          className="w-100vw absolute -bottom-1"
        />
        {/* <div className="absolute z-10 top-60% ">
          <SortByPanel />
        </div> */}
      </div>
      <section
        id="dresses"
        className={` bg-bgLightBlue px-10vw pt-3vh pb-5vh relative ${paddingForProductCard} mb-5vh`}
      >
        <h1 className="underline text-primaryBlue text-2xl sm:text-3xl 3xl:text-5xl font-bold w-100% sm:w-70% xmd:w-70% mb-3vh sm:mb-5vh leading-loose">
          WE HAVE SOMETHING FOR EVERYONE:
        </h1>
        <div
          id="container"
          className="grid sm:space-y-16 justify-center  max-w-25rem sm:max-w-100% mx-3vw sm:mx-0 "
        >
          {/* {printProductCluster()} */}
          {dataFound === true ? printProductCluster() : ""}
        </div>
      </section>
      <PageBreakLine />
    </div>
  );
};

export default Dresses;
