const express = require("express");
const Product = require("../models/Product.js");
const data = require("../assets/products.json");
const router = express.Router();

router.post("/create-db", async (req, res) => {
  try {
    console.log("Creating database - deleting existing products...");
    await Product.deleteMany();
    console.log("Inserting", data.length, "products...");
    await Product.insertMany(data);
    console.log("Database created successfully!");
    res.status(201).json({ message: "DB created", count: data.length });
  } catch (error) {
    console.log("Error creating database:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({
      title: new RegExp(req.query.search || ""),
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    console.log("Fetching product with ID:", req.params.id);
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      console.log("Product not found for ID:", req.params.id);
      return res.status(404).json({ message: "Product not found" });
    }
    
    console.log("Product found:", product.title);
    res.json(product);
  } catch (error) {
    console.log("Error fetching product:", error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
