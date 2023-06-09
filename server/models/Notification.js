import { Schema, Types, model } from "mongoose";

const NotificationSchema = new Schema({
  owner: {
    required: true,
    type: Types.ObjectId,
  },
  status: {
    required: true,
    type: String,
  },
  orderId: {
    required: true,
    type: Types.ObjectId,
  },
});

const Notification = model("notification", NotificationSchema);

export default Notification;
