import Dresses from "./Dresses";
import Footwear from "./Footwear";
import Jewellery from "./Jewellery";
import axios from "axios";
import config from "../../config/config";
// import { useDispatch } from "react-redux";
// import { addDress } from "../../store/dressFeaturedSlice";
// import { addJewellery } from "../../store/jewelleryFeaturedSlice";
// import { addFootwear } from "../../store/footwearFeaturedSlice";
import { useEffect } from "react";

const CategorySegment = () => {
  // const dispatchDress = useDispatch();
  // const dispatchJewellery = useDispatch();
  // const dispatchFootwear = useDispatch();

  const getAllFeaturedProducts = async () => {
    const allFeaturedoProducts = await axios.get(
      config.backendDevURL + "/getEveryFeatured"
    );

    console.log({ "allFeaturedlProducts": allFeaturedoProducts });

    // dispatchDress(addDress(allFeaturedlProducts.data.featuredDressCluster));

    // dispatchJewellery(
    //   addJewellery(allFeaturedlProducts.data.featuredJewelleryCluster)
    // );
    // dispatchFootwear(
    //   addFootwear(allFeaturedlProducts.data.featuredFootwearCluster)
    // );
    // console.log({
    //   "allFeaturedFootwear": allFeaturedlProducts.data.featuredFootwearCluster,
    // });
    const allFeaturedProducts = [allFeaturedoProducts.data];

    sessionStorage.setItem(
      "allFeaturedProducts",
      JSON.stringify(allFeaturedProducts)
    );
  };

  useEffect(() => {
    getAllFeaturedProducts();
    sessionStorage.setItem(
      "lastVisitedPage",
      JSON.stringify(window.location.href)
    );
  }, []);

  return (
    <>
      <div id="categoryContainer">
        <Dresses />
        <Jewellery />
        <Footwear />
      </div>
    </>
  );
};

export default CategorySegment;
