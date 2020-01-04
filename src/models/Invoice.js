const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const invoiceSchema = new Schema(
    {
        number: {
            type: String
            // required: true,
        },
        date: {
            type: Date,
            default: Date.now()
        },
        dueDate: {
            type: Date
            // default: new Date(Date.now() + 12096e5), // 14 days from now. https://stackoverflow.com/a/7751977/5012005
        },
        status: {
            type: String,
            default: 'DRAFT',
            enum: ['DRAFT', 'PAYMENT_DUE', 'PAID']
        },
        lineItems: [
            {
                description: String,
                unitAmount: Number,
                quantity: Number
                // amount: Number // TODO: Calculate this logically
            }
        ],

        notes: {
            type: String,
            trim: true
        },
        paymentDetails: {
            type: String,
            trim: true
        },
        customerId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Customer'
        }
    },
    { timestamps: true }
);

module.exports =
    mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
