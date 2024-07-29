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
import Link from "next/link";
import { Rating } from "@/app/searchedProducts/page";
import Star from "@/app/SVG/Star";
import { LikeButton } from "@/app/components/Buttons/Buttons";

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
          className="grid sm:space-y-16 justify-center  max-w-25rem sm:max-w-100% mb-12 mx-1 sm:mx-0 "
        >
          {dataFound === true ? printProductCluster() : ""}
        </div>
        <h1 className="text-lg mb-4 font-semibold">More of the dresses:</h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-10 ">
          {allFeaturedDress &&
            allFeaturedDress.map((product: product) => (
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
      </section>
      <PageBreakLine />
    </div>
  );
};

export default Dresses;
