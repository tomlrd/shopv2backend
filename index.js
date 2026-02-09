const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

mongoose.connect("mongodb+srv://thomaslaroudie_db_user:2dbMAJesP7BWayGf@shopv2.trgnw6d.mongodb.net/");

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(4000, () => console.log("Server started"));
