const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    handphoneId: {type: mongoose.Types.ObjectId, ref: "Handphone"},
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: { 
      type: Number,
      required: true,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true}
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

