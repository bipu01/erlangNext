import Product from "../../db/productSchema";
import dbConnect from "../../utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("q");
  try {
    await dbConnect();
    try {
      const result = await Product.find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { desc: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
        ],
      });
      if (result.length > 0) {
        return NextResponse.json(result);
      } else {
        return NextResponse.json("No such product found");
      }
    } catch (error) {
      return NextResponse.json("Internal server error");
    }
  } catch (error) {
    return NextResponse.json({
      message: "Problem connecting to db",
      error: error,
    });
  }
}
