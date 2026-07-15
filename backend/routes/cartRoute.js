import express from "express"
import { addToCart, decreaseItem, getCart, increaseItem, removeItem } from "../controllers/cart/cart.js"
import { authMiddleware } from "../middleware/middleware.js"

const cartRoute = express.Router()

cartRoute.post("/add-to-cart",authMiddleware, addToCart);

cartRoute.get("/get-cart",authMiddleware, getCart);

cartRoute.patch("/increase-item/:id",authMiddleware, increaseItem);

cartRoute.patch("/decrease-item/:id",authMiddleware, decreaseItem);

cartRoute.delete("/remove-item/:id", authMiddleware, removeItem);



export default cartRoute