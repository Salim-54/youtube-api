import expressAsyncHandler from "express-async-handler";

import User from "../database/model/auth.model";
import {
  handleGetSingle,
  handleDelete,
  handleCreateUser,
  handleUpdate,
  handleCreate,
} from "../helper/general.helper.js";
import passwordGenerator from "../utils/generatePassword";
import {
  findUserByEmail,
  isCorrectPassword,
  generateToken,
} from "../helper/auth.helper.js";
import { verifyMail } from "../utils/mailer";
import { keyGenerator } from "../utils/keyGenerator";

const httpRegisterUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    role,
    location,
    birthDay,
    gender,
    language,
  } = req.body;
  try {
    const userExist = await findUserByEmail(email);
    if (userExist) {
      return res.status(400).json({
        status: "Fail",
        message: `Email ${email} is already in our system`,
      });
    }
    const hashedPassword = await passwordGenerator(password);
    const referralKey = keyGenerator(10);

    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      referralKey: referralKey,
      role,
      location,
      birthDay,
      gender,
      language,
    };

    const createdUser = await handleCreateUser(User, newUser, res);

    if (createdUser) {
      // await verifyMail(email, createdUser.id, req);
      return res.status(201).json({
        _id: createdUser._id,
        email: createdUser.email,
        gender: createdUser.gender,
        location: createdUser.location,
        language: createdUser.language,
        birthDay: createdUser.birthDay,
        lastName: createdUser.lastName,
        firstName: createdUser.firstName,
        role: createdUser.role,
        phone: createdUser.phone,
        verified: createdUser.verified,
        subscribers: createdUser.subscribers,
        referralKey: createdUser.referralKey,
      });
    } else {
      return res.status(500).json({ message: "Internal server error!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ooops! something went wrong!" });
  }
};

const httpLoginUser = expressAsyncHandler(async (req, res) => {
  const userInfo = req.body;
  const foundUser = await findUserByEmail(userInfo.email);
  try {
    if (await isCorrectPassword(foundUser, userInfo)) {
      return res.status(200).json({
        _id: foundUser._id,
        email: foundUser.email,
        lastName: foundUser.lastName,
        firstName: foundUser.firstName,
        role: foundUser.role,
        verified: foundUser.verified,
        phone: foundUser.phone,
        token: generateToken({
          _id: foundUser._id,
          email: foundUser.email,
          role: foundUser.role,
          lastName: foundUser.lastName,
          firstName: foundUser.firstName,
          phone: foundUser.phone,
        }),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `We can't find a user with ${userInfo.email}` });
  }
});

const httpGetAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password").sort({ email: 1 });

  users
    ? res.status(200).json(users)
    : res.status(500).json({ message: "Internal server error" });
};

// @desc Get a user by Id
// @route /api/v1/users/Id
const httpGetUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id, { password: 0 }).populate("profile");
    // const user = await handleGetSingle(User, id);
    !user
      ? res.status(404).json({ status: "Fail", message: "User Not Found!" })
      : res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "ooops! something went wrong!" });
  }
};


const httpUpdateUser = () => {};

const httpDeleteUser = async(req, res) => {
    const { id } = req.params;
    const user = await handleGetSingle(User, id);
    if (!user) {
        return res.status(400).json({ status: "Fail", message: "Invalid user id" });
    }
    const isDeleted = await handleDelete(User, id);
    if (isDeleted.acknowledged)
        res
        .status(200)
        .json({ message: `User with ${user.email} removed successfully` });
};

export {
  httpRegisterUser,
  httpGetAllUsers,
  httpGetUser,
  httpUpdateUser,
  httpDeleteUser,
  httpLoginUser,
};