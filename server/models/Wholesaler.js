import { Schema, model } from "mongoose";

const WholesalerSchema = new Schema({
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
});

const Wholesaler = model("wholesaler", WholesalerSchema);

export default Wholesaler;
