import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import User from "../../db/userSchema";

export async function GET(req: NextRequest) {
  const headers = req.headers.get("x-user");
  const userInfo = await JSON.parse(headers || "");

  // console.log({ xUser: userInfo });

  try {
    dbConnect();
    // const session = await getServerSession(authOptions);
    // if (session) {
    //   console.log({ session: session });
    // }
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
        address: "",
        phone: 0,
        isAuthorized: true,
        isAdmin: userFromDb.isAdmin,
      };
      return NextResponse.json({ message: user });
    } catch (error) {
      return NextResponse.json("Error fetching user");
    }
  } catch (error) {
    return NextResponse.json("Error connecting to db");
  }
}
