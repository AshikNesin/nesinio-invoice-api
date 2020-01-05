const mongoose = require('mongoose');
const Invoice = mongoose.model('Invoice');
const Customer = mongoose.model('Customer');

const Mutations = {
    async createCustomer(customer) {
        const doc = await Customer.create(customer);
        return doc;
    },
    async createInvoice({ data }) {
        const customer = await Customer.findById(data.customerId);
        if (!customer) {
            throw new Error('Customer does not exists');
        }
        const invoice = {
            ...data,
            lineItems: data.lineItems.map(item => ({
                id: mongoose.Types.ObjectId(),
                ...item
            }))
        };
        const doc = await Invoice.create(invoice);
        return doc;
    },
    async updateInvoice({ data }) {
        const updates = {
            ...data,
            lineItems: data.lineItems.map(item => {
                if (!item.id) {
                    item.id = mongoose.Types.ObjectId();
                }
                return {
                    ...item
                };
            })
        };

        const updatedDoc = await Invoice.findOneAndUpdate(
            { _id: data.id },
            { $set: updates },
            { new: true, runValidators: true, context: 'query' }
        );
        return updatedDoc;
    },
    async updateCustomer({ data }) {
        const updates = {
            ...data
        };

        const updatedDoc = await Customer.findOneAndUpdate(
            { _id: data.id },
            { $set: updates },
            { new: true, runValidators: true, context: 'query' }
        );
        return updatedDoc;
    }
};

module.exports = Mutations;
