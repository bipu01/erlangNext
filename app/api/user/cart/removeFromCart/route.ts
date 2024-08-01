import User from "@/app/api/db/userSchema";
import dbConnect from "@/app/api/utils/mongodb";
import { product } from "@/app/store/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const productId = url.searchParams.get("productId");

  const header = req.headers.get("x-user");
  const user = JSON.parse(header || "");
  try {
    await dbConnect();
    // console.log("Remove from cart is reached");
    try {
      const searchedUser = await User.findOne({ email: user.email });

      searchedUser.itemsInCart = searchedUser.itemsInCart.filter(
        (item: product) => item._id?.toString() !== productId
      );

      const updatedUser = await searchedUser.save();

      const userToSend = {
        name: updatedUser.name,
        email: updatedUser.email,
        itemsInCart: updatedUser.itemsInCart,
        likedProducts: updatedUser.likedProducts,
        settings: updatedUser.settings,
        otherInfo: updatedUser.otherInfo,
        isAuthorized: true,
      };

      console.log("Removed from cart");
      // console.log({ updatedUser: userToSend });

      return NextResponse.json({
        message: "Product removed from cart",
        user: userToSend,
      });
    } catch (error) {
      return NextResponse.json("Trouble adding to cart");
    }
  } catch (error) {
    return NextResponse.json("Trouble connecting to db");
  }
}
