import express from "express";
import authenticated from "../middleware/protection";
import {
  subscribe,
  getAllReferrals,
  getMySubs,
} from "../controllers/subscribe.controller";

const router = express.Router();

router.get("/subscribe/referral=:referral", subscribe);
router.get("/all", authenticated, getAllReferrals);
router.get("/mine", authenticated, getMySubs);

export default router;