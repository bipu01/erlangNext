import { useSelector } from "react-redux";
import PageBreakLine from "../../../../components/PageBreakLine";
import { ProductCluster } from "../../../../components/ProductCard/ProductCluster";
import { paddingForProductCard } from "../../../../defineSize";
import SortByPanel from "../../SortByPanel";
import { rootStore } from "../../../../store/type";
import { productClusterProp } from "../../../../declare";

const Dresses = () => {
  const allFeaturedDress = useSelector(
    (state: rootStore) => state.allFeaturedDress[0]
  );

  const printProductCluster = () => {
    //It just consoles log the allFeaturedDress from GlobalState in redux toolkit
    if (allFeaturedDress) {
      // console.log({ "allFeaturedDress": allFeaturedDress });

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
    <>
      <div className="relative mt-7vh">
        <img src="/assets/weavyArch.svg" alt="wave" className="w-100vw" />
        <div className="absolute z-10 top-60% ">
          <SortByPanel />
        </div>
      </div>
      <section
        id="dresses"
        className={` bg-bgLightBlue px-10vw py-5vh relative ${paddingForProductCard} mb-20vh`}
      >
        <h1 className=" text-primaryBlue text-3xl 3xl:text-5xl font-bold w-100% sm:w-70% xmd:w-70% mb-10vh">
          WE HAVE SOMETHING FOR EVERYONE
        </h1>
        <div id="container" className="grid space-y-16 ">
          {printProductCluster()}
        </div>
      </section>
      <PageBreakLine />
    </>
  );
};

export default Dresses;
