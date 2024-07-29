"use client";
import Dresses from "@/app/home/CategorySegment/Dresses/Dresses";
import Footwear from "@/app/home/CategorySegment/Footwear/Footwear";
import Jewellery from "@/app/home/CategorySegment/Jewellery/Jewelleryz";
import axios from "axios";
// import config from "../../config/config";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDataFetchedToTrue } from "@/redux/features/dataFetchSlice";
import { RootState } from "@/redux/store";
import { setUser } from "@/redux/features/userSlice";

const CategorySegment = () => {
  const dispatch = useDispatch();
  const getAllFeaturedProducts = async () => {
    const allFeaturedoProducts = await axios.get("api/getEveryFeatured");

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

  // const dataFound = useSelector(
  //   (state: RootState) => state.dataFetchReducer.isDataFetched
  // );

  return (
    <>
      <div id="categoryContainer flex flex-col">
        <Dresses />
        <Jewellery />
        <Footwear />
      </div>
    </>
  );
};

export default CategorySegment;
