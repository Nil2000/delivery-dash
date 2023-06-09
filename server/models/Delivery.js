import { Schema, model } from "mongoose";

const DeliverySchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  available: {
    default: true,
    type: Boolean,
  },
});

const Delivery = model("delivery", DeliverySchema);

export default Delivery;
