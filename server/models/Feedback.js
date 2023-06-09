import { Schema, Types, model } from "mongoose";

const FeedbackSchema = new Schema({
  owner: {
    type: Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Feedback = model("feedback", FeedbackSchema);

export default Feedback;
