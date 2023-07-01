import expressAsyncHandler from "express-async-handler";

import User from "../database/model/auth.model";
import Profile from "../database/model/profile.model";
import {
  handleGetSingle,
  handleDelete,
  handleCreateUser,
  handleUpdate,
} from "../helper/general.helper.js";
import passwordGenerator from "../utils/generatePassword";

const updateProfile = async (req, res) => {
  const id = req.user._id;
  const {
    education,
    degree,
    dob,
    image,
    fatherName,
    userName,
    motherName,
    telephone,
    address,
    educationInstitution,
    reference,
  } = req.body;
  try {
    const userExist = await User.findById(id, { password: 0 });
    if (!userExist) {
      return res.status(400).json({
        status: "Fail",
        message: `Ooooops! the user does not exist in our system!!`,
      });
    }

    const profileToUpdate = await Profile.findOne({ user: id });

    const profile = {
      education,
      degree,
      dob,
      image,
      fatherName,
      userName,
      motherName,
      telephone,
      address,
      educationInstitution,
      reference,
    };

    if (!profileToUpdate) {
      return res.status(400).json({
        status: "Fail",
        message: `Ooooops! the user does not exist in our system!!`,
      });
    }

    const updatedProfile = await handleUpdate(
      Profile,
      profileToUpdate._id,
      profile,
      res
    );

    updatedProfile
      ? res.status(201).json({
          message: "Your profile has been updated successfully",
          data: updatedProfile,
        })
      : res.status(500).json({ message: "Internal server error!" });
  } catch (error) {
    return res.status(500).json({ message: "ooops! something went wrong!" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Profile.find({}).sort({ email: 1 }).populate("user");

    users
      ? res.status(200).json(users)
      : res.status(500).json({ message: "Internal server error" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchMyProfile = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id).sort({ email: 1 });

    if (user) {
      const myProfile = await Profile.findOne({ user: user._id }).populate(
        "user"
      );

      myProfile
        ? res.status(200).json(myProfile)
        : res.status(500).json({ message: "You are not verified yet!" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }

    //     ? res.status(200).json(users)
    //     : res.status(500).json({ message: "Internal server error" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findById(id).populate("user");

    profile
      ? res.status(200).json(profile)
      : res.status(500).json({ message: "Your profile doesn't exist!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export { updateProfile, getAllUsers, fetchMyProfile, fetchProfileById };