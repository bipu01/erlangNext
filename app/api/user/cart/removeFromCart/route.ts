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
      const searchedUser = await User.findById(user.id);

      searchedUser.itemsInCart = searchedUser.itemsInCart.filter(
        (item: product) => item._id?.toString() !== productId
      );

      // await User.findOneAndUpdate(
      //   { _id: user.id },
      //   { $pull: { itemsInCart: { _id: productId } } },
      //   { new: true }
      // );
      const updatedUser = await searchedUser.save();

      const userToSend = {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        itemsInCart: updatedUser.itemsInCart,
        likedProducts: updatedUser.likedProducts,
        settings: updatedUser.settings,
        otherInfo: updatedUser.otherInfo,
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
