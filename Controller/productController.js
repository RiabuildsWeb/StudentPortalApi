import Product from  "../Models/productModel.js";
import studentModel from "../Models/studentModel.js"
import cloudinary from "../Config/cloudinary.js";

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const getStudentId =  await studentModel.findById(req.params.studentId);
    const { name, description, price, category, quantity, stock, image } = req.body;
    if (!getStudentId) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;

    const product = await Product.create(
        {
      name,
      description,
      price,
      category,
      quantity,
      stock,
      image: imageUrl,
    });
 await getStudentId.products.push(product._id);
 await getStudentId.save();

    res.status(201).json({
        message: "Product created successfully",
        data: product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  try { const getAll = await Product.find();
    res.status(200).json({ message: "Products retrieved successfully", data: getAll });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { createProduct, getAllProducts };
