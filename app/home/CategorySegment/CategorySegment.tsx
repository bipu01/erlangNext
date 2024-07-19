"use client";
import Dresses from "@/app/home/CategorySegment/Dresses/Dresses";
import Footwear from "@/app/home/CategorySegment/Footwear/Footwear";
import Jewellery from "@/app/home/CategorySegment/Jewellery/Jewelleryz";
import axios from "axios";
import config from "../../config/config";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsDataFetchedToTrue } from "@/redux/features/dataFetchSlice";

const CategorySegment = () => {
  const dispatch = useDispatch();
  const getAllFeaturedProducts = async () => {
    const allFeaturedoProducts = await axios.get(
      config.backendDevURL + "/getEveryFeatured"
    );
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
    dispatch(setIsDataFetchedToTrue());
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
