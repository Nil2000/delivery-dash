import { Schema, Types, model } from "mongoose";

const CartSchema = new Schema({
  owner: {
    type: Types.ObjectId,
  },
  ownerType: {
    type: String,
  },
  productId: {
    type: Types.ObjectId,
  },
  quantity: {
    type: Number,
  },
});

const Cart = model("cart", CartSchema);

export default Cart;
