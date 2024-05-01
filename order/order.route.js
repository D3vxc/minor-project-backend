const express = require('express');
const router = express.Router();

const {
    createOrder
    } = require('./order.controller');


// POST /api/orders - Create a new order
router.post('/neworders', createOrder);

module.exports = router;
