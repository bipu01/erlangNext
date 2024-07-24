import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import Product from "../../db/productSchema";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("productId");

  try {
    dbConnect();
    try {
      const product = await Product.findOne({ _id: id });
      return NextResponse.json(product);
    } catch (error) {}
  } catch (error) {
    return NextResponse.json("error connecting to db");
  }
};
