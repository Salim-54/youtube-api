import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    company: {
      type: String,
      required: false,
    },

    degree: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },
    form: {
      type: String,
      required: true,
      default: "Under contract",
    },
    image: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/salim-atlp-brand/image/upload/v1672150488/mmeds/pil_typxzv.png",
    },
    deadLine: {
      type: String,
      required: false,
    },
    posts: {
      type: Number,
      required: true,
      default: 1,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    shortLists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;