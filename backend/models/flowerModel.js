// models/flowerModel.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const flowerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {   // ✅ lowercase
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flower", flowerSchema);
