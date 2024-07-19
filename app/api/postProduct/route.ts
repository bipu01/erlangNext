import Product from "../db/productSchema";
import dbConnect from "../utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    try {
      const body = await req.json();
      const product = new Product({
        name: body.name,
        priceCurrent: body.currentPrice,
        priceOriginal: body.originalPrice,
        description: body.description,
        img1: body.img1,
        img2: body.img2,
        img3: body.img3,
        isFeatured: body.isFeatured,
        ratingCount: body.ratingCount,
        ratingRate: body.ratingRate,
        category: body.category,
      });
      product.save();

      return NextResponse.json({ message: "Data recieved successfully" });
    } catch (error) {
      return NextResponse.json({
        message: "Error saving data",
        error: error,
      });
    }
  } catch (error) {
    return NextResponse.json({ message: "Problem connectiong to db" });
  }
}
