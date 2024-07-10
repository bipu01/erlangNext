import { useSelector } from "react-redux";
import { ProductCluster } from "../../../../components/ProductCard/ProductCluster";
import { paddingForProductCard } from "../../../../defineSize";
import { rootStore } from "../../../../store/type";
import { productClusterProp } from "../../../../declare";

const Footwear = () => {
  const allFeaturedFootwear = useSelector(
    (state: rootStore) => state.allFeaturedFootwear[0]
  );

  const printProductCluster = () => {
    //It just consoles log the allFeaturedDress from GlobalState in redux toolkit
    if (allFeaturedFootwear) {
      // console.log({ "allFeaturedFootwear": allFeaturedFootwear });

      for (let i = 0; i < allFeaturedFootwear.length; i += 2) {
        const pairs: productClusterProp = {
          leftRow: {
            _id: allFeaturedFootwear[i]._id,
            name: allFeaturedFootwear[i].name,
            desc: allFeaturedFootwear[i].desc,
            ratingRate: allFeaturedFootwear[i].ratingRate,
            ratingCount: allFeaturedFootwear[i].ratingCount,
            priceOriginal: allFeaturedFootwear[i].priceOriginal,
            priceCurrent: allFeaturedFootwear[i].priceCurrent,
            img1: allFeaturedFootwear[i].img1,
            img2: allFeaturedFootwear[i].img2,
            img3: allFeaturedFootwear[i].img3,
          },
          rightRow: {
            _id: allFeaturedFootwear[i + 1]._id,
            name: allFeaturedFootwear[i + 1].name,
            desc: allFeaturedFootwear[i + 1].desc,
            ratingRate: allFeaturedFootwear[i + 1].ratingRate,
            ratingCount: allFeaturedFootwear[i + 1].ratingCount,
            priceOriginal: allFeaturedFootwear[i + 1].priceOriginal,
            priceCurrent: allFeaturedFootwear[i + 1].priceCurrent,
            img1: allFeaturedFootwear[i + 1].img1,
            img2: allFeaturedFootwear[i + 1].img2,
            img3: allFeaturedFootwear[i + 1].img3,
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
    <>
      <div className="relative mt-15vh">
        <img src="/assets/weavyArch.svg" alt="wave" className="w-100vw" />
        {/* <div className="absolute z-10 top-60% ">
          <SortByPanel />
        </div> */}
      </div>
      <section
        id="dresses"
        className={` bg-bgLightBlue px-10vw py-5vh relative ${paddingForProductCard} mb-20vh`}
      >
        <p className=" text-primaryBlue text-3xl 3xl:text-5xl font-bold w-100% sm:w-70% xmd:w-70% mb-10vh leading-loose ">
          STYLISH AND STRONG: OUR WOMEN'S BOOT COLLECTION
        </p>
        <div id="container" className="grid space-y-16">
          {printProductCluster()}
        </div>
      </section>
    </>
  );
};

export default Footwear;
