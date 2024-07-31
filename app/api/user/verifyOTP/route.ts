import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import UsersToVerify from "../../db/usersToVerifySchema";
import User from "../../db/userSchema";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();

    try {
      const data = await req.json();
      const userToVerify = await UsersToVerify.findOne({ email: data.email });

      // if no user is found to verify
      if (!userToVerify) {
        return NextResponse.json(
          { message: "No user found to verify" },
          { status: 404 }
        );

        // If user is found to verify
      } else {
        // If OTP expires
        const bufferTime = 5000;

        if (userToVerify.OTPExpire < Date.now() - bufferTime) {
          return NextResponse.json(
            { message: "OTP is expired" },
            { status: 401 }
          );
        }

        if (userToVerify.OTP == data.OTP) {
          // console.log({ userToVerify: userToVerify.name });
          const newUser = new User({
            email: userToVerify.email,
            name: userToVerify.name,
            password: userToVerify.password,
            otherInfo: [],
            settings: [],
            likedProducts: [],
            itemsInCart: [],
            accessToken: "filler",
            refreshToken: "filler",
            address: "none",
            phone: 98,
          });
          await newUser.save();

          await UsersToVerify.findOneAndDelete({
            email: userToVerify.email,
          });

          return NextResponse.json(
            { message: "Successfully Signed up" },
            { status: 200 }
          );
        }
      }

      return NextResponse.json(
        { message: "this situation is not handled " },
        { status: 501 }
      );
    } catch (error) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Trouble Connecting to db" },
      { status: 500 }
    );
  }
};
