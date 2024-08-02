import Product from "../db/productSchema";
import dbConnect from "../utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const headers = req.headers.get("x-user");
  const user = await JSON.parse(headers || "");

  if (!user.isAdmin) {
    return NextResponse.json(
      { message: "You are not authorized to post" },
      { status: 402 }
    );
  }

  try {
    await dbConnect();
    try {
      const body = await req.json();
      const product = new Product({
        name: body.name,
        priceCurrent: body.currentPrice,
        priceOriginal: body.originalPrice,
        desc: body.description,
        img1: body.img1,
        img2: body.img2,
        img3: body.img3,
        isFeatured: body.isFeatured,
        ratingCount: body.ratingCount,
        ratingRate: body.ratingRate,
        category: body.category,
      });
      product.save();

      return NextResponse.json({ message: "Product saved" }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        {
          message: "Error saving data",
          error: error,
        },
        { status: 501 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Problem connectiong to db" },
      { status: 500 }
    );
  }
}
