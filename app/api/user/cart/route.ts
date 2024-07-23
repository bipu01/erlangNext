import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import User from "../../db/userSchema";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const headers = req.headers.get("x-user");
    const userInfo = JSON.parse(headers || "");

    try {
      const itemsInCart = await User.findOne({
        _id: userInfo.id,
      }).select("itemsInCart");

      return NextResponse.json({ itemsInCart: itemsInCart });
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error connecting to db",
      error: error,
    });
  }
}
