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
    const body = await req.json();
    // const body = data.formdata;
    console.log({ body: body });
    try {
      const user = await User.findOne({ email: body.email });
      if (user) {
        const isMatch = await bcrypt.compare(body.password, user.password);
        if (isMatch) {
          const { name, email, _id } = user;
          const userDataToSendToClient = {
            name: user.name,
            email: user.email,
            itemsInCart: user.itemsInCart,
            likedProducts: user.likedProducts,
            settings: user.settings,
            otherInfo: user.otherInfo,
            isAuthorized: true,
          };
          // console.log({ userDataToSendToClient: userDataToSendToClient });
          const accessToken = generateAccessToken(name, email, _id);
          const refreshToken = generateRefreshToken(name, email, _id);

          //Set token to db

          await User.findOneAndUpdate(
            { _id: _id },
            { $set: { accessToken: accessToken, refreshToken: refreshToken } }
          );

          const serialized = serialize("OutSiteJwt", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: MAX_AGE,
          });

          //Set token to httpOnly cookie
          const response = NextResponse.json(
            {
              message: "Authenticated!",
              userData: userDataToSendToClient,
            },
            { status: 200 }
          );
          response.headers.set("Set-Cookie", serialized);
          return response;
        } else {
          return NextResponse.json({ message: "Invalid credentials" });
        }
      } else {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 501 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "errror connecting to db",
        error: error,
      },
      { status: 500 }
    );
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
