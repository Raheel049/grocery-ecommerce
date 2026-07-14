import express from "express"
import { addToCart } from "../controllers/cart/cart.js"

const cartRoute = express.Router()

cartRoute.post("/add-to-cart", addToCart)

export default cartRoute