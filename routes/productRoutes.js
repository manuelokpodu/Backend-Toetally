const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const authenticate = require("../middlewares/authMiddleware");

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post("/:id/rate", authenticate, productController.rateProduct);

router.post("/:id/like", authenticate, productController.likeProduct);

router.post("/:id/unlike", authenticate, productController.unlikeProduct);

app.get("/logo", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "logo.png"));
});

module.exports = router;
