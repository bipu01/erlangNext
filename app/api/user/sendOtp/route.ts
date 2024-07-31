import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import User from "../../db/userSchema";
import encryptPassword from "../signup/helper/passEncrypter";
import { generateOTP } from "./OTPGenerator";
import { sendOTPToUser, transporter } from "./Nodemailer";
import UsersToVerify from "../../db/usersToVerifySchema";

export async function POST(req: NextRequest) {
  try {
    dbConnect();
    try {
      const body = await req.json();
      // const data = await JSON.parse(body);

      console.log({ bodyOfsendOtp: body });
      const password = await encryptPassword(body.password);

      const user = await User.findOne({ email: body.email });
      if (user) {
        //Check if user already exists
        console.log("User already exists");
        return NextResponse.json(
          { message: "User already exists" },
          { status: 409 }
        );
      } else {
        const OTP = await generateOTP();
        sendOTPToUser(
          transporter,
          body.email,
          OTP,
          "Your OTP for signup: ",
          "Do not share this code"
        );

        const unverifiedUser = await UsersToVerify.findOne({
          email: body.email,
        });

        if (unverifiedUser) {
          await UsersToVerify.findOneAndDelete({
            email: body.email,
          });
        }

        const newUserToVerify = await new UsersToVerify({
          name: body.name,
          email: body.email,
          OTP: OTP,
          OTPExpire: Date.now() + 5 * 60000,
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

        await newUserToVerify.save();

        return NextResponse.json(
          {
            message: "OTP sent and UserToVerify updated in db",
          },
          { status: 200 }
        );
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
