import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    phone: {
      type: String,
      required: false,
      unique: true,
    },
    referralKey: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
      min: 3,
      max: 10,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: "normal",
    },

    subscribers: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;