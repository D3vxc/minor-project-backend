const express = require('express');
const router = express.Router();
const { 
  AllProduct, 
  NewProduct, 
  GetProduct, 
  UpdateProduct, 
  DeleteProduct, 
} = require('./product.controller');

router.get('/allproducts', AllProduct);
router.post('/newproducts', NewProduct);  
router.get('/getproducts/:id', GetProduct);
router.put('/updateproduct/:id', UpdateProduct);
router.delete('/deleteproduct/:id', DeleteProduct);

module.exports = router;