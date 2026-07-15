import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },

        // Product Snapshot
        name: {
          type: String,
          required: true,
        },

        imageUrl: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },

        subTotal: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    totalItems: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;