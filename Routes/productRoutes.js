import express from "express";
import  upload from "../Config/multer.js";
import {
  createProduct,getAllProducts
} from "../Controller/productController.js";
const router = express.Router();

// CREATE PRODUCT
router.post("/create/:studentId",  upload.single("image"), createProduct);
// GET ALL PRODUCTS
router.get("/all", getAllProducts);

export default router;
