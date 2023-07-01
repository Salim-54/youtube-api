import {
  handleGetSingle,
  handleDelete,
  handleCreateUser,
  handleUpdate,
  handleCreate,
} from "../helper/general.helper.js";
import Category from "../database/model/category.model";

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const data = {
      name: name,
    };

    const newCategory = await Category.create(data);

    newCategory
      ? res.status(201).json({ data: newCategory })
      : res
          .status(500)
          .json({ status: "Fail", message: "Something went wrong!" });
  } catch (error) {
    console.log(error);
    error.code === 11000
      ? res
          .status(404)
          .json({ status: "Fail", message: "Category already exists" })
      : res
          .status(500)
          .json({ status: "Fail", message: "Something went wrong!!" });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const catExist = await Category.findById(id);
    if (!catExist) {
      return res.status(400).json({
        status: "Fail",
        message: `Ooooops! the category does not exist in our system!!`,
      });
    }

    const updatedCategory = await handleUpdate(
      Category,
      id,
      { name: name },
      res
    );

    updatedCategory
      ? res.status(201).json({
          message: "Category has been updated successfully",
          data: updatedCategory,
        })
      : res.status(500).json({ message: "Internal server error!" });
  } catch (error) {
    return res.status(500).json({ message: "ooops! something went wrong!" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const cats = await Category.find({}).sort({ name: 1 }).populate("jobs");

    cats
      ? res.status(200).json(cats)
      : res.status(500).json({ message: "Internal server error" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const cat = await Category.findById(id).populate("jobs");

    cat
      ? res.status(200).json(cat)
      : res.status(500).json({ message: "Category doesn't exist!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const cat = await Category.findById(id);

    if (cat) {
      await Category.findByIdAndDelete(id);
      res
        .status(304)
        .json({ message: "category has been deleted successfully!" });
    } else {
      res.status(404).json({ message: "Category doesn't exist!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createCategory,
  deleteCategory,
  fetchCategoryById,
  getAllCategories,
  updateCategory,
};