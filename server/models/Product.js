import { Schema, Types, model } from "mongoose";

const ProductSchema = new Schema({
  owner: {
    type: Types.ObjectId,
  },
  ownerType: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

const Product = model("product", ProductSchema);

export default Product;
