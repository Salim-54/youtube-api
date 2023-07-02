import express from "express";
import { subscribe } from "../controllers/subscribe.controller";

const router = express.Router();

router.get("/subscribe", subscribe);

export default router;
