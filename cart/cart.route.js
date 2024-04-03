const express = require("express");
const router = express.Router();
const {
  addToCart,
  updateCartItem,
  removeItemFromCart,
  getCartItems,
  clearCart,
} = require("./cart.controller");

router.post("/addToCart", addToCart);
router.patch("/updateCart/:productId", updateCartItem);
router.delete("/removeFromCart/:productId", removeItemFromCart);
router.get("/getCarts", getCartItems);
router.delete("/deleteCart", clearCart);

module.exports = router;
