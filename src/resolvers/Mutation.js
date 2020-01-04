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

        console.log(JSON.stringify(data, null, 2));
        console.log(JSON.stringify(updates, null, 2));

        console.log(`to update`);

        console.log(JSON.stringify(updatedDoc, null, 2));
        return updatedDoc;
    }
};

module.exports = Mutations;
