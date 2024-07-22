import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import User from "../../db/userSchema";
import { parse, serialize } from "cookie";
import { jwtVerify } from "jose";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const authCookie = req.headers.get("cookie");
    const cookies = authCookie ? parse(authCookie) : {};
    const token = cookies["OutSiteJwt"];

    // const user = jwt.decode(token, { complete: true })?.payload;
    // console.log({ data: token });

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(accessTokenSecret)
    );

    const user = payload;
    console.log({ user: user.id });

    try {
      const user = await User.findOneAndUpdate(
        { _id: payload.id },
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
