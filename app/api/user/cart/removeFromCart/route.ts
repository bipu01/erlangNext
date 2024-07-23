import User from "@/app/api/db/userSchema";
import dbConnect from "@/app/api/utils/mongodb";
import { parse } from "cookie";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const allCookies = req.headers.get("cookie");
    const cookie = allCookies ? parse(allCookies) : {};
    const token = cookie["OutSiteJwt"];

    const body = await req.json();
    // const product = body.product;

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(accessTokenSecret)
    );
    const { _id, name, email } = payload;

    try {
      await User.findOneAndUpdate(
        { _id: _id },
        { $push: { itemsInCart: body.product } },
        { new: true }
      );

      return NextResponse.json("Product added to cart");
    } catch (error) {
      return NextResponse.json("Trouble adding to cart");
    }
  } catch (error) {
    return NextResponse.json("Trouble connecting to db");
  }
}
