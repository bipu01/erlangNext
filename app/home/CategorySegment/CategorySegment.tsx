"use client";
import Dresses from "@/app/home/CategorySegment/Dresses/Dresses";
import Footwear from "@/app/home/CategorySegment/Footwear/Footwear";
import Jewellery from "@/app/home/CategorySegment/Jewellery/Jewelleryz";
import {
  setFeaturedDress,
  setFeaturedFootwear,
  setFeaturedJewellery,
} from "@/redux/features/featuredProductsSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const CategorySegment = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllFeaturedProducts = async () => {
      const allFeaturedoProducts = await axios.get("api/getEveryFeatured");

      dispatch(
        setFeaturedDress(allFeaturedoProducts.data.featuredDressCluster)
      );
      dispatch(
        setFeaturedJewellery(allFeaturedoProducts.data.featuredJewelleryCluster)
      );
      dispatch(
        setFeaturedFootwear(allFeaturedoProducts.data.featuredFootwearCluster)
      );
    };

    getAllFeaturedProducts();
    sessionStorage.setItem("lastVisitedPage", "/");
  }, []);

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
