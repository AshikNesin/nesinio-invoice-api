const mongoose = require('mongoose');

const Invoice = mongoose.model('Invoice');
const Customer = mongoose.model('Customer');

const getInvoice = async invoiceId => {
    let payload = {};
    const invoice = await Invoice.findById(invoiceId);
    const customer = await Customer.findById(invoice.customerId);
    payload = { ...payload, ...invoice._doc, customer: { ...customer._doc } };
    return payload;
};

exports.fetchInvoice = async (req, res) => {
    const { invoiceId } = req.params;
    res.send(await getInvoice(invoiceId));
};

exports.fetchInvoices = async (req, res) => {
    res.send(await Invoice.find());
};

exports.addInvoice = async (req, res) => {
    const invoice = {
        ...req.body
    };
    const doc = await Invoice.create(invoice);
    res.send(doc);
};

exports.updateInvoice = async (req, res) => {
    const updates = {
        ...req.body
    };

    const updatedDoc = await Invoice.findOneAndUpdate(
        { _id: req.invoice._id },
        { $set: updates }
        // { new: true, runValidators: true, context: 'query' }
    );
    res.send(updatedDoc);
};
