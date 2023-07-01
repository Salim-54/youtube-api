import express from 'express';
import {
  getAllUsers,
  updateProfile,
  fetchMyProfile,
  fetchProfileById,
} from "../controllers/profile.controller";
import authenticated from "../middleware/protection";

const router = express.Router();

// router.post('/:id', saveMedicine);
router.get("/me", authenticated, fetchMyProfile);
router.get("/:id", fetchProfileById);
router.get("/", getAllUsers);
router.put("/", authenticated, updateProfile);

export default router;