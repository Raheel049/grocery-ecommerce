import cartModel from "../../models/cart/cart";
import productModel from "../../models/product/productSchema";
import { calculateCart } from "../../utils/cartCalculation";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    // ===============================
    // Validation
    // ===============================

    if (!productId || !quantity) {
      return res.status(400).json({
        status: false,
        message: "ProductId and quantity are required",
      });
    }

    const productExists = await productModel.findById(productId);

    if (!productExists) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    // ===============================
    // Stock Validation
    // ===============================

    if (productExists.stock < quantity) {
      return res.status(400).json({
        status: false,
        message: "Insufficient stock",
      });
    }

    // ===============================
    // Find Cart
    // ===============================

    let cart = await cartModel.findOne({ user: userId });

    // ===============================
    // Cart Doesn't Exist
    // ===============================

    if (!cart) {
      cart = new cartModel({
        user: userId,
        items: [],
      });
    }

    // ===============================
    // Check Product Already Exists
    // ===============================

    const productExisting = cart.items.find((item) => item.product.toString() === productId)

    if(productExisting){
        productExisting.quantity += quantity,
        productExisting.subTotal = productExisting.quantity * productExisting.price;
    }else{
        cart.items.push({
            product: productExists._id,
            name: productExists.name,
            image: productExists.image,
            quantity,
            price: productExists.price,
            subTotal: quantity * productExists.price,
          });
    }

    calculateCart(cart)

    await cart.save();

    return res.status(200).json({
      status: true,
      message: "Product added to cart",
      data: cart,
    });



  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: false,
      data: null,
    });
  }
};
