// import { individualProduct } from "@/app/declare";
import Product from "../db/productSchema";
import dbConnect from "../utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    try {
      const featuredDressList = await Product.find({
        isFeatured: true,
        category: "dress",
      });
      const featuredJewelleryList = await Product.find({
        isFeatured: true,
        category: "jewellery",
      });
      const featuredFootwearList = await Product.find({
        isFeatured: true,
        category: "footwear",
      });

      let featuredDressCluster: Array<object> = [];
      let featuredJewelleryCluster: Array<object> = [];
      let featuredFootwearCluster: Array<object> = [];

      let i = 0;

      featuredDressList.forEach((element) => {
        featuredDressCluster[i] = {
          _id: element._id.toString(),
          "name": element.name || "",
          "desc": element.desc || "",
          "priceCurrent": element.priceCurrent || 0,
          "priceOriginal": element.priceOriginal || 0,
          "img1": element.img1 || "",
          "img2": element.img2 || "",
          "img3": element.img3 || "",
          "isFeatured": element.isFeatured || false,
          "ratingCount": element.ratingCount || 0,
          "ratingRate": element.ratingRate || 0,
          "category": element.category,
        };
        i++;
      });

      let j = 0;
      featuredJewelleryList.forEach((element) => {
        featuredJewelleryCluster[j] = {
          _id: element._id.toString(),
          "name": element.name || "",
          "desc": element.desc || "",
          "priceCurrent": element.priceCurrent,
          "priceOriginal": element.priceOriginal,
          "img1": element.img1,
          "img2": element.img2 || "",
          "img3": element.img3 || "",
          "isFeatured": element.isFeatured || false,
          "ratingCount": element.ratingCount || 0,
          "ratingRate": element.ratingRate || 0,
          "category": element.category,
        };
        j++;
      });

      let k = 0;
      featuredFootwearList.forEach((element) => {
        featuredFootwearCluster[k] = {
          _id: element._id.toString(),
          "name": element.name || "",
          "desc": element.desc || "",
          "priceCurrent": element.priceCurrent || 0,
          "priceOriginal": element.priceOriginal || 0,
          "img1": element.img1 || "",
          "img2": element.img2 || "",
          "img3": element.img3 || "",
          "isFeatured": element.isFeatured || false,
          "ratingCount": element.ratingCount || 0,
          "ratingRate": element.ratingRate || 0,
          "category": element.category,
        };
        k++;
      });

      let everyFeaturedProduct = {
        featuredDressCluster: featuredDressCluster,
        featuredJewelleryCluster: featuredJewelleryCluster,
        featuredFootwearCluster: featuredFootwearCluster,
      };

      return NextResponse.json(everyFeaturedProduct);
    } catch (error) {
      console.error({ "error occured": error });
      return NextResponse.json({
        message: "Something went wrong in trycatch",
        error: error,
      });
    }
  } catch (error) {
    // console.log("Database not connected successfully");
    return NextResponse.json({
      message: "database connection problem",
      error: error,
    });
  }
}

// const [featuredDressList, featuredJewelleryList, featuredFootwearList] =
//   await Promise.all([
//     Product.find({ isFeatured: true, category: "dress" }),
//     Product.find({ isFeatured: true, category: "jewellery" }),
//     Product.find({ isFeatured: true, category: "footwear" }),
//   ]);

// const formatProduct = (element: individualProduct) => ({
//   _id: element._id.toString(),
//   name: element.name || "",
//   desc: element.desc || "",
//   priceCurrent: element.priceCurrent || 0,
//   priceOriginal: element.priceOriginal || 0,
//   img1: element.img1 || "",
//   img2: element.img2 || "",
//   img3: element.img3 || "",
//   isFeatured: element.isFeatured || false,
//   ratingCount: element.ratingCount || 0,
//   ratingRate: element.ratingRate || 0,
//   category: element.category,
// });

// const featuredDressCluster = featuredDressList.map(formatProduct);
// const featuredJewelleryCluster = featuredJewelleryList.map(formatProduct);
// const featuredFootwearCluster = featuredFootwearList.map(formatProduct);

// const everyFeaturedProduct = {
//   featuredDressCluster,
//   featuredJewelleryCluster,
//   featuredFootwearCluster,
// };
