import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import User from "../../db/userSchema";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;
const MAX_AGE = 60 * 60 * 24 * 30; //30 days

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();

    try {
      const body = await req.json();
      console.log({ userFromGoogleSignin: body });
      const user = await User.findOne({ email: body.email });

      if (user) {
        const userDataToSendToClient = {
          name: user.name,
          email: user.email,
          itemsInCart: user.itemsInCart,
          likedProducts: user.likedProducts,
          settings: user.settings,
          otherInfo: user.otherInfo,
          isAuthorized: true,
        };

        const accessToken = generateAccessToken(
          body.name,
          body.email,
          body._id
        );
        const refreshToken = generateRefreshToken(
          body.name,
          body.email,
          body._id
        );

        await User.findOneAndUpdate(
          { email: body.emai },
          { $set: { accessToken: accessToken, refreshToken: refreshToken } }
        );

        const serialized = serialize("OutSiteJwt", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: MAX_AGE,
        });

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
        // Create User and send the response
        const accessToken = generateAccessToken(
          body.name,
          body.email,
          body._id
        );
        const refreshToken = generateRefreshToken(
          body.name,
          body.email,
          body._id
        );

        const newUser = new User({
          email: body.email,
          name: body.name,
          otherInfo: [],
          settings: [],
          likedProducts: [],
          itemsInCart: [],
          accessToken: accessToken,
          refreshToken: refreshToken,
          address: "none",
          phone: 98,
          createdWithGoogle: true,
        });
        await newUser.save();

        const userCreated = await User.findOne({ email: body.email });

        const userDataToSendToClient = {
          name: userCreated.name,
          email: userCreated.email,
          itemsInCart: userCreated.itemsInCart,
          likedProducts: userCreated.likedProducts,
          settings: userCreated.settings,
          otherInfo: userCreated.otherInfo,
          isAuthorized: true,
        };
        const serialized = serialize("OutSiteJwt", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: MAX_AGE,
        });

        const response = NextResponse.json(
          {
            message: "Authenticated!",
            userData: userDataToSendToClient,
          },
          { status: 201 }
        );
        response.headers.set("Set-Cookie", serialized);
        return response;
      }
    } catch (error) {
      return NextResponse.json(
        { message: "something went wrong" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Trouble connecting to db" },
      { status: 500 }
    );
  }
};

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
