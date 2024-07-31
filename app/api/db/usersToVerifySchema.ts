import mongoose from "mongoose";

// let UserToVerify = mongoose.Model<any>;

const userToVerifySchema = new mongoose.Schema(
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
      required: true,
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
    OTP: {
      type: String,
      required: true,
    },
    OTPExpire: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const UsersToVerify =
  mongoose.models.UsersToVerify ||
  mongoose.model("UsersToVerify", userToVerifySchema, "userToVerify");

export default UsersToVerify;
