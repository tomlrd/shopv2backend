const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  price: Number,
  delivered: Boolean,
  address: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
