import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import { parse } from "cookie";
import { jwtVerify } from "jose";
import User from "../../db/userSchema";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;

export async function GET(req: NextRequest) {
  try {
    dbConnect();
    const authCookie = req.headers.get("cookie");
    const cookies = authCookie ? parse(authCookie) : {};
    const token = cookies["OutSiteJwt"];

    try {
      const decoded = await jwtVerify(
        token,
        new TextEncoder().encode(accessTokenSecret)
      );
      const itemsInCart = await User.findOne({
        _id: decoded.payload.id,
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
