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
import { findByReferralKey } from "../helper/auth.helper.js";
import { verifyMail } from "../utils/mailer";

const subscribe = async (req, res) => {
  const referral = req.query.referral;

  try {
    const referralExist = await findByReferralKey(referral);
    if (referralExist) {
      return res.status(200).json({ message: referralExist.email });
    } else {
      console.log(referral);
      return res.status(404).json({ message: "This referral is not known" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ooops! something went wrong!" });
  }
};

export { subscribe };