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
  const { phone } = req.body;
  try {
    // const userExist = await findUserByEmail(email);
    // if (userExist) {
    //   return res.status(400).json({
    //     status: "Fail",
    //     message: `Email ${email} is already in our system`,
    //   });
    // }
    const referralKey = keyGenerator(10);
    const newPassword = keyGenerator(5);
    const hashedPassword = await passwordGenerator(newPassword);

    const newUser = {
      phone,
      password: hashedPassword,
      referralKey: referralKey,
    };

    const createdUser = await handleCreateUser(User, newUser, res);

    if (createdUser) {
      // await verifyMail(email, createdUser.id, req);
      return res.status(201).json({
        data: `https://hara.smolleys.com/api/auth/io/referral=${createdUser.referralKey}`,
        password: newPassword,
        phone: phone,
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
  try {
    const foundUser = await User.findOne({ phone: userInfo.phone });

    console.log(userInfo);
    console.log(foundUser);

    const isIt = await isCorrectPassword(foundUser, userInfo);

    if (isIt) {
      console.log(isIt);
      return res.status(200).json({
        _id: foundUser._id,
        role: foundUser.role,
        verified: foundUser.verified,
        phone: foundUser.phone,
        token: generateToken({
          _id: foundUser._id,
          role: foundUser.role,
          phone: foundUser.phone,
        }),
      });
    } else {
      console.log(isIt);
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `We can't find a user with ${userInfo.phone}` });
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

const httpMyProfile = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await handleGetSingle(User, _id);
    if (!user) {
      return res.status(400).json({ status: "Fail", message: "Invalid token" });
    } else {
      res.status(200).json({ data: user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `${error}` });
  }
};



export {
  httpRegisterUser,
  httpGetUser,
  httpUpdateUser,
  httpDeleteUser,
  httpLoginUser,
  httpMyProfile,
};