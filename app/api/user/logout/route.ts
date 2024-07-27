import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import User from "../../db/userSchema";
import { serialize } from "cookie";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const headers = req.headers.get("x-user");
    const userInfo = JSON.parse(headers || "");

    try {
      const user = await User.findOneAndUpdate(
        { _id: userInfo.id },
        { $set: { accessToken: "filler", refreshToken: "filler" } }
      );

      const serialized = serialize("OutSiteJwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      const response = NextResponse.json(
        { message: "successfully logged out" },
        {}
      );
      response.headers.set("Set-Cookie", serialized);
      return response;
    } catch (error) {
      return NextResponse.json("User not found");
    }
  } catch (error) {
    return NextResponse.json("Error connecting to db");
  }
}
