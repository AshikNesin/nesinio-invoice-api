const mongoose = require('mongoose');
const Invoice = mongoose.model('Invoice');
const Customer = mongoose.model('Customer');
// const uuidv4 = require('uuid/v4');

const Mutations = {
    async createInvoice(customer) {
        const doc = await Customer.create(customer);
        return doc;
    },
    async createInvoice({ data }) {
        const invoice = {
            ...data,
            lineItems: data.lineItems.map(item => ({
                id: mongoose.Types.ObjectId(),
                ...item
            }))
        };
        console.log(JSON.stringify(invoice, null, 2));
        const doc = await Invoice.create(invoice);
        return doc;
    }
};

module.exports = Mutations;
