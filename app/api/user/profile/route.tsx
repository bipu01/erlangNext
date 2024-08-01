import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import User from "../../db/userSchema";

export async function GET(req: NextRequest) {
  const headers = req.headers.get("x-user");
  const userInfo = JSON.parse(headers || "");

  try {
    dbConnect();
    try {
      const userFromDb = await User.findOne({
        email: userInfo.email,
      });
      // console.log({ user: userFromDb });
      const user = {
        name: userFromDb.name,
        email: userFromDb.email,
        itemsInCart: userFromDb.itemsInCart,
        likedProducts: userFromDb.likedProducts,
        settings: userFromDb.settings,
        otherInfo: userFromDb.otherInfo,
        isAuthorized: true,
        phone: userFromDb.phone,
        address: userFromDb.address,
      };
      return NextResponse.json({ message: user });
    } catch (error) {
      return NextResponse.json("Error fetching user");
    }
  } catch (error) {
    return NextResponse.json("Error connecting to db");
  }
}
