const ProductModel = require("./product.model");

// Get all products
const AllProduct = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new product
const NewProduct = async (req, res) => {
  const {name, description, price} = req.body;
  try {
    const product = await ProductModel.create({
      name,
      description,
      price
   });
    res
    .status(201)
    .send({ data: product, message: "Product created successfully" });
  } catch (err) {
    res.status(400).json({ error: 'Invalid Request' });
  }
};

// Get a product by ID
const GetProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a product
const UpdateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: 'Invalid Request' });
  }
};

// Delete a product
const DeleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  AllProduct,
  NewProduct,
  GetProduct,
  UpdateProduct,
  DeleteProduct
};