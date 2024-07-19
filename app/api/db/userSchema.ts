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
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
