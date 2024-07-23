import { parse } from "cookie";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import User from "../../db/userSchema";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";

export async function GET(req: NextRequest) {
  const header = req.headers.get("cookie");
  //   console.log({ header: header });
  const tokens = header ? parse(header) : {};
  //   console.log({ tokens: tokens });
  const authToken = tokens["OutSiteJwt"];
  console.log({ authToken: authToken });

  const isAuthenticated = await jwtVerify(
    authToken,
    new TextEncoder().encode(accessTokenSecret)
  );
  console.log({ isAuthenticatedPayload: isAuthenticated.payload.id });

  if (isAuthenticated) {
    try {
      dbConnect();
      try {
        const userFromDb = await User.findOne({
          _id: isAuthenticated.payload.id,
        });
        console.log({ user: userFromDb });
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
  } else {
    return NextResponse.json({ message: null });
  }
}
