import express from "express";
import authenticated from "../middleware/protection";
import {
  subscribe,
  getAllReferrals,
  getMySubs,
} from "../controllers/subscribe.controller";

const router = express.Router();

router.get("/subscribe", subscribe);
router.get("/all", getAllReferrals);
router.get("/mine", authenticated, getMySubs);

export default router;