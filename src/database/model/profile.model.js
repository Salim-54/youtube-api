import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    education: {
      type: String,
      required: false,
    },
    degree: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/salim-atlp-brand/image/upload/v1672150488/mmeds/pil_typxzv.png",
    },
    fatherName: {
      type: String,
      required: false,
    },
    userName: {
      type: String,
      required: false,
    },
    motherName: {
      type: String,
      required: false,
    },
    telephone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },

    educationInstitution: {
      type: String,
      required: false,
    },
    reference: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;