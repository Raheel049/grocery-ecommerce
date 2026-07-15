import cartModel from "../../models/cart/cart.js";
import productModel from "../../models/product/productSchema.js";
import { calculateCart } from "../../utils/cartCalculation.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    console.log("userId", userId);

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

    const productExisting = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (productExisting) {
      (productExisting.quantity += quantity),
        (productExisting.subTotal =
          productExisting.quantity * productExisting.price);
    } else {
      cart.items.push({
        product: productExists._id,
        name: productExists.name,
        imageUrl: productExists.imageUrl,
        quantity,
        price: productExists.price,
        subTotal: quantity * productExists.price,
      });
    }

    calculateCart(cart);

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

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await cartModel.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

export const increaseItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const cart = await cartModel.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find((item) => item.product.toString() === id);

    if (!item) {
      return res.status(404).json({
        status: false,
        message: "Product not found in cart",
      });
    }

    item.quantity += 1;

    item.subTotal = item.quantity * item.price;

    // Recalculate cart totals
    cart.totalItems = cart.items.length;

    cart.totalQuantity = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.subTotal, 0);

    await cart.save();

    return res.status(200).json({
      status: true,
      message: "Quantity increased",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

export const decreaseItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const cart = await cartModel.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === id
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        status: false,
        message: "Product not found in cart",
      });
    }

    const item = cart.items[itemIndex];

    // If quantity is greater than 1, decrease it
    if (item.quantity > 1) {
      item.quantity -= 1;
      item.subTotal = item.quantity * item.price;
    } else {
      // Remove item if quantity becomes 0
      cart.items.splice(itemIndex, 1);
    }

    // Recalculate cart totals
    cart.totalItems = cart.items.length;

    cart.totalQuantity = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.subTotal, 0);

    await cart.save();

    return res.status(200).json({
      status: true,
      message: "Cart updated successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

export const removeItem = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
  
      const cart = await cartModel.findOne({
        user: userId,
      });
  
      if (!cart) {
        return res.status(404).json({
          status: false,
          message: "Cart not found",
          data: null,
        });
      }
  
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === id
      );
  
      if (itemIndex === -1) {
        return res.status(404).json({
          status: false,
          message: "Product not found in cart",
          data: null,
        });
      }
  
      // Remove product from cart
      cart.items.splice(itemIndex, 1);
  
      // Recalculate totals
      cart.totalItems = cart.items.length;
  
      cart.totalQuantity = cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
  
      cart.totalPrice = cart.items.reduce(
        (sum, item) => sum + item.subTotal,
        0
      );
  
      await cart.save();
  
      return res.status(200).json({
        status: true,
        message: "Item removed successfully",
        data: cart,
      });
  
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message || "Internal server error",
        data: null,
      });
    }
  };
