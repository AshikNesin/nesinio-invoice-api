const mongoose = require('mongoose');
const Invoice = mongoose.model('Invoice');
const Customer = mongoose.model('Customer');

const Query = {
    async invoice({ id: invoiceId }) {
        const invoice = await Invoice.findById(invoiceId);
        console.log(JSON.stringify(invoice, null, 2));

        return invoice;
    },
    async invoices() {
        const invoices = await Invoice.find({});
        return invoices;
    },
    async customer({ id: customerId }) {
        const customer = await Customer.findById(customerId);
        return customer;
    },
    async customers() {
        const customers = await Customer.find({});
        return customers;
    }
};

module.exports = Query;
