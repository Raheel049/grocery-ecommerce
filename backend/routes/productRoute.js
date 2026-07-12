import express from "express";
import { addProduct, getAllProducts } from "../controllers/product/product.js";
import { authMiddleware } from "../middleware/middleware.js"; // Aapka token auth middleware

const productRoute = express.Router();

// Public route to get products, Admin route to post products
productRoute.get("/list", getAllProducts);
productRoute.post("/add",authMiddleware, addProduct); // Pehle middleware verify karega token

export default productRoute;