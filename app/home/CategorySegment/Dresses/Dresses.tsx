// import { useSelector } from "react-redux";
import PageBreakLine from "../../../components/PageBreakLine/PageBreakLine";
import { ProductCluster } from "../../../components/ProductCard/ProductCluster";
import { paddingForProductCard } from "../../../defineSize";
import { productClusterProp } from "../../../declare";

import weavyArch from "../../../../public/assets/weavyArch.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SmallProductHomeGrid from "@/app/components/SmallProductGridHomePage/SmallProductHomePageGrid";

const Dresses = () => {
  const featuredDress = useSelector(
    (state: RootState) => state.featuredProductsSlice.featuredDress
  );

  const printProductCluster = () => {
    for (let i = 0; i < featuredDress.length; i += 2) {
      const pairs: productClusterProp = {
        leftRow: {
          _id: featuredDress[i]._id,
          name: featuredDress[i].name,
          desc: featuredDress[i].desc,
          ratingRate: featuredDress[i].ratingRate,
          ratingCount: featuredDress[i].ratingCount,
          priceOriginal: featuredDress[i].priceOriginal,
          priceCurrent: featuredDress[i].priceCurrent,
          img1: featuredDress[i].img1,
          img2: featuredDress[i].img2,
          img3: featuredDress[i].img3,
        },
        rightRow: {
          _id: featuredDress[i + 1]._id,
          name: featuredDress[i + 1].name,
          desc: featuredDress[i + 1].desc,
          ratingRate: featuredDress[i + 1].ratingRate,
          ratingCount: featuredDress[i + 1].ratingCount,
          priceOriginal: featuredDress[i + 1].priceOriginal,
          priceCurrent: featuredDress[i + 1].priceCurrent,
          img1: featuredDress[i + 1].img1,
          img2: featuredDress[i + 1].img2,
          img3: featuredDress[i + 1].img3,
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
        <Image
          src={weavyArch}
          alt="wave"
          className="w-100vw absolute -bottom-1"
        />
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
          className="grid sm:space-y-16 justify-center  max-w-25rem sm:max-w-100% mb-12 mx-1 sm:mx-0 "
        >
          {featuredDress && printProductCluster()}
        </div>
        <h1 className="text-lg mb-4 font-semibold">More of the dresses:</h1>
        <div>
          {featuredDress && (
            <SmallProductHomeGrid products={featuredDress.slice(2)} />
          )}
        </div>
      </section>
      <PageBreakLine />
    </div>
  );
};

export default Dresses;
