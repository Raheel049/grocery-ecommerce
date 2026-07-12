import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    imageUrl: { type: String, required: true }, // Grocery item image link
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);
export default productModel;