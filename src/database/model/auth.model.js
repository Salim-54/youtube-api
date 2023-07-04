import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      min: 3,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      min: 3,
      max: 20,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    referralKey: {
      type: String,
      unique: true,
      required: true,
    },
    location: {
      type: String,
      required: false,
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