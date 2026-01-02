// backend/models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name is required"], trim: true },
    description: { type: String, required: [true, "Product description is required"] },
    mainCategory: {
      type: String,
      enum: [
        "Fertilizers",
        "Pesticides",
        "Seeds",
        "Equipment",
        "Irrigation",
        "Farmer Accessories",
        "Soil & Testing",
        "Organic Products",
        "Tools",
        "Accessories"
      ],
      required: [true, "Main category is required"],
    },
    subCategory: { type: String, required: [true, "Sub category is required"] },
    price: { type: Number, required: [true, "Product price is required"], min: [0, "Price cannot be negative"] },
    unit: {
      type: String,
      enum: ["kg", "liter", "ml", "gram", "piece", "packet", "set", "pair"],
      default: "kg",
    },
    stock: { type: Number, required: [true, "Stock is required"], min: [0, "Stock cannot be negative"], default: 0 },
    imageUrl: { type: String, default: "https://via.placeholder.com/300x300.png?text=Agri+Product" },
    cropType: { type: String, default: "All crops" },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
