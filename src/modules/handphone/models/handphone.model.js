const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const handphoneSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    brand: {
      type: String,
      required: true,
      unique: true
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true}
);

const Handphone = mongoose.model("Handphone", handphoneSchema);
module.exports =  Handphone;

