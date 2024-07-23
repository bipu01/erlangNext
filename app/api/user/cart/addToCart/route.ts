import Product from "@/app/api/db/productSchema";
import User from "@/app/api/db/userSchema";
import dbConnect from "@/app/api/utils/mongodb";
import { parse } from "cookie";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const headers = req.headers.get("x-user");
    const userInfo = JSON.parse(headers || "");

    const body = await req.json();

    try {
      const product = await Product.findOne({ _id: body.productId });
      console.log({ product: product });
      const userUpdate = await User.findOneAndUpdate(
        { _id: userInfo.id },
        { $push: { itemsInCart: product } },
        { new: true }
      );
      return NextResponse.json({
        message: "Product added to cart",
      });
    } catch (error) {
      return NextResponse.json("Trouble adding to cart");
    }
  } catch (error) {
    return NextResponse.json("Trouble connecting to db");
  }
}
