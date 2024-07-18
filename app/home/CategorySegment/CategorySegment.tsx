"use client";
import Dresses from "./Dresses/Dresses";
import Footwear from "./Footwear/Footwear";
import Jewellery from "./Jewellery/Jewellery";
import axios from "axios";
import config from "../../config/config";
import { useEffect } from "react";

const CategorySegment = () => {
  const getAllFeaturedProducts = async () => {
    const allFeaturedoProducts = await axios.get(
      config.backendDevURL + "/getEveryFeatured"
    );
    // console.log({
    //   allFeaturedoProducts: allFeaturedoProducts.data.featuredDressCluster,
    // });

    sessionStorage.setItem(
      "allFeaturedDress",
      JSON.stringify(allFeaturedoProducts.data.featuredDressCluster)
    );
    sessionStorage.setItem(
      "allFeaturedFootwear",
      JSON.stringify(allFeaturedoProducts.data.featuredFootwearCluster)
    );
    sessionStorage.setItem(
      "allFeaturedJewellery",
      JSON.stringify(allFeaturedoProducts.data.featuredJewelleryCluster)
    );
  };

  useEffect(() => {
    getAllFeaturedProducts();
    sessionStorage.setItem("lastVisitedPage", "/");
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
