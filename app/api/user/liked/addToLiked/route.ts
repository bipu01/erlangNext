import Product from "@/app/api/db/productSchema";
import User from "@/app/api/db/userSchema";
import dbConnect from "@/app/api/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";

export const POST = async (req: NextRequest) => {
  const url = new URL(req.url);
  const productId = url.searchParams.get("productId");

  // const data = await req.json();
  const headers = req.headers.get("x-user");
  const user = await JSON.parse(headers || "");
  const userId = user.id;
  console.log({ userId: userId });
  console.log({ productId: productId });
  try {
    await dbConnect();

    try {
      const product = await Product.findOne({ _id: productId });
      const userUpdate = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { likedProducts: product } },
        { new: true }
      );
      return NextResponse.json("successfully added to liked");
    } catch (error) {
      return NextResponse.json("Error updating liked products");
    }
  } catch (error) {
    return NextResponse.json("Error connecting to db");
  }
};
