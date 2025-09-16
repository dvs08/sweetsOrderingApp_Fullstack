
const express = require('express');
const invoiceController = require('../controllers/invoiceController'); 

const router = express.Router();

router.get('/', invoiceController.getUserInvoices);
router.get('/:id', invoiceController.getInvoiceById);

module.exports = router