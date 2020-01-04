const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

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
                id: {
                    type: mongoose.Schema.ObjectId,
                    required: true
                },
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

// Duplicate the ID field.
invoiceSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

invoiceSchema.virtual('total').get(function() {
    return (this.total = this.lineItems
        .map(item => item.unitAmount * item.quantity)
        .reduce((a, b) => a + b, 0));
});

invoiceSchema.virtual('customer').get(async function() {
    const customer = await mongoose.model('Customer').findById(this.customerId);
    return customer;
});

// Ensure virtual fields are serialised.
invoiceSchema.set('toJSON', {
    virtuals: true
});

// Ensure virtual fields are serialised.
invoiceSchema.set('toObject', {
    virtuals: true
});

module.exports =
    mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
