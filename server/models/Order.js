import { Schema, Types, model } from "mongoose";

const OrderSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  productList: {
    type: Array,
    default: [],
  },
  to: {
    type: String,
    required: true,
  },
  fromId: {
    type: Types.ObjectId,
    required: true,
  },
  toId: {
    type: Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  deliveryGuyId: {
    type: Types.ObjectId,
    required: true,
  },
  transaction: {
    type: Number,
    required: true,
  },
});

const Order = model("order", OrderSchema);

export default Order;
