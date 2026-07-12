import productModel from "../../models/product/productSchema.js";

// 🚀 1. Add New Product (Admin Only)
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    const adminId = req.user.id

    if (!name || !price || !category || !imageUrl) {
      return res.status(400).json({ message: "Required fields are missing", status: false });
    }

    const newProduct = new productModel({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
      adminId
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully into database",
      data: newProduct,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error", status: false });
  }
};

// 🚀 2. Get All Products (For Admin List & User Dashboard)
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json({ data: products, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error", status: false });
  }
};