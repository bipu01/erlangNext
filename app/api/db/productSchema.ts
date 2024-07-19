import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  priceOriginal: {
    type: Number,
  },
  priceCurrent: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
  img1: {
    type: String,
    required: true,
  },
  img2: {
    type: String,
  },
  img3: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
  },
  ratingRate: {
    type: Number,
  },
  ratingCount: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
});

// export default ProductSchema
const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema, "products");
export default Product;
