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
router.post("/updateCart", updateCartItem);
router.delete("/removeFromCart", removeItemFromCart);
router.get("/getCarts", getCartItems);
router.delete("/deleteCart", clearCart);

module.exports = router;
