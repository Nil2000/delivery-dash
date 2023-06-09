import { Schema, model } from "mongoose";

const RetailerSchema = new Schema({
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

const Retailer = model("retailer", RetailerSchema);

export default Retailer;
