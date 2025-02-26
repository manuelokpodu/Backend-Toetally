const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

const corsOptions = {
  origin: [
    "https://toe-tally-frontend-lzmv.vercel.app",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/sub", newsletterRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/orders", orderRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);

  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/logo", (req, res) => {
  res.sendFile(path.join(__dirname, "products.json"));
});

module.exports = app;

// manuelokpodu
// vku2APPgDy5sEwMI
// mongodb+srv://manuelokpodu:vku2APPgDy5sEwMI@cluster0.dkbks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
