const express = require('express');
const router = express.Router();
const { AllProduct, NewProduct, GetProduct, UpdateProduct, DeleteProduct } = require('./product.controller');

app.get('/products', async (req, res) => {
    try {
      const products = await AllProduct.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.post('/products', async (req, res) => {
    try {
      const product = await NewProduct.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: 'Invalid Request' });
    }
  });
  
  app.get('/products/:id', async (req, res) => {
    try {
      const product = await GetProduct.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.put('/products/:id', async (req, res) => {
    try {
      const product = await UpdateProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(400).json({ error: 'Invalid Request' });
    }
  });
  
  app.delete('/products/:id', async (req, res) => {
    try {
      const product = await DeleteProduct.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;