import {
  TransactionSchema as _TransactionSchema,
  Types,
  model,
} from "mongoose";

const TransactionSchema = new _TransactionSchema({
  delivered: {
    type: Boolean,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  delivery: {
    type: Types.ObjectId,
    required: true,
  },
});

const Transaction = model("transaction", TransactionSchema);

export default Transaction;
