const mongoose = require('mongoose');

const Customer = mongoose.model('Customer');

exports.addCustomer = async (req, res) => {
  const customer = {
    ...req.body,
  };
  const doc = await Customer.create(customer);
  res.send(doc);
};

exports.updateCustomer = async (req, res) => {
  const updates = {
    ...req.body,
  };

  const updatedDoc = await Customer.findOneAndUpdate(
    { _id: req.invoice._id },
    { $set: updates }
    // { new: true, runValidators: true, context: 'query' }
  );
  res.send(updatedDoc);
};
