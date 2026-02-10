// Charger dotenv (silencieux si le fichier n'existe pas)
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");

// Fallback pour MONGODB_URI si non défini
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://thomaslaroudie_db_user:2dbMAJesP7BWayGf@shopv2.trgnw6d.mongodb.net/shopv2?retryWrites=true&w=majority";

// Debug des variables d'environnement au démarrage
console.log("=== ENVIRONMENT CHECK ===");
console.log("NODE_ENV:", process.env.NODE_ENV || "not set");
console.log("PORT:", process.env.PORT || "not set (using 4000)");
console.log("MONGODB_URI from env:", !!process.env.MONGODB_URI ? "YES" : "NO (using fallback)");
console.log("MONGODB_URI value:", MONGODB_URI ? "DEFINED" : "UNDEFINED");
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN || "not set");
console.log("========================");

const app = express();
app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN || "http://localhost:3000",
      "https://shopv2-sepia.vercel.app",
    ],
  }),
);
app.use(express.json());

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

mongoose.connect(MONGODB_URI, {
  tls: true,
  tlsAllowInvalidCertificates: false,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
