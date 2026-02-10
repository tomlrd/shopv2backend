// Charger dotenv seulement en développement local (si le fichier .env existe)
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");

// Debug des variables d'environnement
console.log("=== ENVIRONMENT CHECK ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);
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

// Fallback pour MONGODB_URI si non défini (pour Northflank)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://thomaslaroudie_db_user:2dbMAJesP7BWayGf@shopv2.trgnw6d.mongodb.net/shopv2?retryWrites=true&w=majority";

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
