// routes.js (or wherever you keep your route definitions)
const express = require('express');
const router = express.Router();
const {
    createInvoice
    } = require('./invoice.controller');

// POST /api/invoices - Create a new invoice
router.post('/newinvoices', createInvoice);

module.exports = router;
