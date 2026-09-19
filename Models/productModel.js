import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    stock: {
      type: Boolean,
      default: true
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
export default mongoose.model("Product", productSchema);