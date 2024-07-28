import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import User from "../../db/userSchema";
import encryptPassword from "./helper/passEncrypter";

export async function POST(req: NextRequest) {
  try {
    dbConnect();
    try {
      const body = await req.json();
      const password = await encryptPassword(body.password);

      const user = await User.findOne({ email: body.email });
      if (user) {
        //Check if user already exists
        return NextResponse.json({ message: "User already exists" });
      } else {
        //Create user if doesnot exists
        const newUser = new User({
          email: body.email,
          name: body.name,
          password: password,
          otherInfo: [],
          settings: [],
          likedProducts: [],
          itemsInCart: [],
          accessToken: "filler",
          refreshToken: "filler",
          address: "none",
          phone: 98,
        });
        // console.log(body);

        await newUser.save();
        return NextResponse.json({
          message: "user successfully created",
          body: body,
        });
      }
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error connecting to db",
      error: error,
    });
  }
}
