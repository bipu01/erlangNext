import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import User from "../../db/userSchema";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcryptjs";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;
const MAX_AGE = 60 * 60 * 24 * 30; //30 days

export async function POST(req: NextRequest) {
  try {
    dbConnect();
    const data = await req.json();
    const body = data.formdata;

    try {
      const user = await User.findOne({ email: body.email });
      if (user) {
        const isMatch = await bcrypt.compare(body.password, user.password);
        if (isMatch) {
          const { name, email, _id } = user;
          const accessToken = generateAccessToken(name, email, _id);
          const refreshToken = generateRefreshToken(name, email, _id);
          console.log({ refreshSecret: refreshToken });
          console.log({ accessTokenSecret: accessToken });

          //Set token to db
          try {
            await User.findOneAndUpdate(
              { _id: _id },
              { $set: { accessToken: accessToken, refreshToken: refreshToken } }
            );
          } catch (error) {
            return NextResponse.json("error setting accessToken");
          }

          const serialized = serialize("OutSiteJwt", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: MAX_AGE,
          });

          //Set token to httpOnly cookie
          const response = NextResponse.json({ message: "Authenticated!" });
          response.headers.set("Set-Cookie", serialized);
          return response;
        } else {
          return NextResponse.json({ message: "Invalid credentials" });
        }
      } else {
        return NextResponse.json({ message: "User not found" });
      }
    } catch (error) {
      console.log("Error found in line 50");
      return NextResponse.json({ error: error });
    }
  } catch (error) {
    console.log("error connecting to db");
    return NextResponse.json({
      message: "errror connecting to db",
      error: error,
    });
  }
}

const generateAccessToken = (name: string, email: string, _id: string) => {
  return sign({ id: _id, name: name, email: email }, accessTokenSecret, {
    expiresIn: MAX_AGE,
  });
};

const generateRefreshToken = (name: string, email: string, _id: string) => {
  return sign({ id: _id, name: name, email: email }, refreshTokenSecret, {
    expiresIn: MAX_AGE,
  });
};
