// https://github.com/wesbos/Learn-Node/blob/master/stepped-solutions/45%20-%20Finished%20App/routes/index.js

const express = require('express');
const invoiceController = require('./../controllers/invoiceController');
const customerController = require('./../controllers/customerController');

const router = express.Router();

router.get('/invoices', invoiceController.fetchInvoices);
router.get('/invoices/:invoiceId', invoiceController.fetchInvoice);
router.post('/invoices', invoiceController.addInvoice);

router.post('/customers', customerController.addCustomer);

router.get('/', (req, res) => {
    res.send('It works!');
});

module.exports = router;
