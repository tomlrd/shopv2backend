const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const Order = require("../models/Order.js");
const isAdmin = require("../middlewares/isAdmin.js");
const router = express.Router();

router.post("/orders", isAuthenticated, async (req, res) => {
  try {
    const { products, address, price } = req.body;
    await Order.create({
      owner: req.user._id,
      products: products,
      address: address,
      price: price,
      delivered: false,
    });
    res.status(201).json({ message: "Order created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put(
  "/orders/mark-delivered/:id",
  isAuthenticated,
  isAdmin,
  async (req, res) => {
    console.log("route mark");

    try {
      await Order.findByIdAndUpdate(req.params.id, { delivered: true });
      res.json({ message: "Updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/orders", isAuthenticated, isAdmin, async (req, res) => {
  try {
    console.log("GET /orders - Fetching all orders");
    console.log("User requesting:", req.user?.username, "Admin:", req.user?.admin);

    const orders = await Order.find()
      .populate("owner", "username email")
      .populate("products.product")
      .sort({ createdAt: -1 });
    
    console.log("Orders found:", orders.length);
    res.json(orders);
  } catch (error) {
    console.log("Error fetching orders:", error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
