const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Required username"],
      trim: true,
      unique: false
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    role: {
      type: String,
      enum : ['customer','admin'],
      default: 'customer'
    },
  },
  {timestamps: true}
);

const User = mongoose.model("User", userSchema);
module.exports = User;
