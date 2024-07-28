import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import User from "../../db/userSchema";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    try {
      const userData = await req.json();
      //   console.log({ userData: userData });
      const sentUser = req.headers.get("x-user");
      const parsedUser = JSON.parse(sentUser || "");
      console.log({ parsedUser: parsedUser });

      const user = await User.findOneAndUpdate(
        { _id: parsedUser.id },
        {
          name: userData.name,
          address: userData.address,
          phone: userData.phone,
        },
        { new: true }
      );

      const updatedUser = await User.findOne({ _id: parsedUser.id });
      console.log({ user: user });

      const userToSendToClient = {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        itemsInCart: updatedUser.itemsInCart,
        likedProducts: updatedUser.likedProducts,
        settings: updatedUser.settings,
        otherInfo: updatedUser.otherInfo,
        isAuthorized: true,
        phone: updatedUser.phone,
        address: updatedUser.address,
      };
      return NextResponse.json({ message: userToSendToClient });
    } catch (error) {
      return NextResponse.json("Trouble editing user data");
    }
  } catch (error) {
    return NextResponse.json("Trouble connecting to db");
  }
};
