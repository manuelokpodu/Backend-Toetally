const express = require("express");

const {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
} = require("../controllers/cartController");

const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticate, getCart);

router.post("/add", authenticate, addToCart);

router.put("/:productId", authenticate, updateQuantity);

router.delete("/:productId", authenticate, removeFromCart);

module.exports = router;
