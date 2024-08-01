import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    otherInfo: {
      type: Array,
    },
    settings: {
      type: Array,
    },
    likedProducts: {
      type: Array,
    },
    itemsInCart: {
      type: Array,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    createdWithGoogle: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model("User", userSchema, "users");
export default User;
