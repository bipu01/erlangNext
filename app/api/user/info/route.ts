import { parse } from "cookie";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import User from "../../db/userSchema";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";

export async function GET(req: NextRequest) {
  const headers = req.headers.get("x-user");
  const userInfo = JSON.parse(headers || "");

  try {
    dbConnect();
    try {
      const userFromDb = await User.findOne({
        _id: userInfo.id,
      });
      // console.log({ user: userFromDb });
      const user = {
        id: userFromDb._id,
        name: userFromDb.name,
        email: userFromDb.email,
        itemsInCart: userFromDb.itemsInCart,
        likedProducts: userFromDb.likedProducts,
        settings: userFromDb.settings,
        otherInfo: userFromDb.otherInfo,
      };
      return NextResponse.json({ message: user });
    } catch (error) {
      return NextResponse.json("Error fetching user");
    }
  } catch (error) {
    return NextResponse.json("Error connecting to db");
  }
}
