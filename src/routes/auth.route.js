import express from 'express';
import {
  httpRegisterUser,
  httpMyProfile,
  httpGetUser,
  httpDeleteUser,
  httpLoginUser,
} from "../controllers/auth.controller";
import authenticated from "../middleware/protection";

const router = express.Router();

router.get("/me", authenticated, httpMyProfile);

router.post("/signup", httpRegisterUser);
router.post("/login", httpLoginUser);
router.get("/:id", httpGetUser);
router.delete('/:id', httpDeleteUser);


export default router;