import express from 'express';
import {
  fetchCategoryById,
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/category.controller";
import authenticated from '../middleware/protection';


const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", fetchCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;