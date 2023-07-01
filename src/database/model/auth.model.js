import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        min: 3,
        required: true,
    },
    lastName: {
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

    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",

    }, ],

    shortlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",

    }, ],
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;