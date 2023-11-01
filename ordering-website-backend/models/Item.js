// models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  sku: String,
  price: Number,
  // Other item properties
});

module.exports = mongoose.model("Item", itemSchema);
