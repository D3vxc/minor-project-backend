const CartModel = require("./cart.model.js"); // You would need to create this model

// Add item to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await CartModel.findOne({ user: req.user._id });

    if (!cart) {
      cart = new CartModel({
        user: req.user._id,
        productData: [{ product: productId, quantity }],
      });
    } else {
      const existingProductIndex = cart.productData.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingProductIndex > -1) {
        cart.productData[existingProductIndex].quantity += quantity;
      } else {
        cart.productData.push({ product: productId, quantity });
      }
    }

    await cart.save();
    console.log("Product added to cart successfully", cart, req.user._id);
    res
      .status(200)
      .json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    console.error("Failed to add to cart:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

// Update item quantity in cart
const updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }
    const index = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (index > -1) {
      cart.products[index].quantity = quantity;
      await cart.save();
      res.status(200).json({ message: "Cart updated", cart });
    } else {
      res.status(404).send({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

// Get cart items
const getCartItems = async (req, res) => {
  try {
    // Assuming your authentication middleware sets req.user
    const userId = req.user._id; // Use the ID from the JWT payload
    const cart = await CartModel.findOne({ user: userId }).populate(
      "productData.product"
    );
    if (!cart) {
      // console.log("cart here", cart);
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  const { userId } = req.body;
  try {
    await CartModel.findOneAndUpdate(
      { user: userId },
      { $set: { products: [] } }
    );
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addToCart,
  updateCartItem,
  removeItemFromCart,
  getCartItems,
  clearCart,
};
