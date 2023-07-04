import expressAsyncHandler from "express-async-handler";

import User from "../database/model/auth.model";
import {
  handleGetSingle,
  handleDelete,
  handleGetAll,
  handleUpdate,
  handleCreate,
} from "../helper/general.helper.js";
import passwordGenerator from "../utils/generatePassword";
import { findByReferralKey } from "../helper/auth.helper.js";
import { verifyMail } from "../utils/mailer";

const subscribe = async (req, res) => {
  const referral = req.query.referral;

  try {
    const referralExist = await findByReferralKey(referral);
    if (referralExist) {
      const incremented = handleUpdate(
        User,

        referralExist._id,
        {
          subscribers: referralExist.subscribers + 1,
        }
      );
      return res.status(200).json({ message: referralExist });
    } else {
      console.log(referral);
      return res.status(404).json({ message: "This referral is not known" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Oops! something went wrong!" });
  }
};

const getAllReferrals = async (req, res) => {
  try {
    const referrals = await handleGetAll(User);
    if (referrals) {
      return res.status(200).json({ data: referrals });
    } else {
      console.log("no referral");
      return res.status(404).json({ message: "This referrals can't be found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Oops! something went wrong!" });
  }
};

const getMySubs = async (req, res) => {
  const id = req.user._id;
  try {
    const referral = await handleGetSingle(User, id);
    if (referral) {
      return res.status(200).json({ data: referral.subscribers });
    } else {
      console.log("no referral");
      return res.status(404).json({ message: "This referral can't be found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Oops! something went wrong!" });
  }
};

export { subscribe, getAllReferrals, getMySubs };