const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const customerSchema = new Schema(
    {
        name: {
            type: String,
            required: 'Please supply a name',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: 'Please Supply an email address'
        },
        mobile: {
            type: Number
        },
        address: {
            type: String,
            trim: true
        },
        defaultCurrency: {
            type: String,
            default: 'INR',
            enum: ['INR', 'USD']
        }
    },
    { timestamps: true }
);

// Duplicate the ID field.
customerSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
customerSchema.set('toJSON', {
    virtuals: true
});

module.exports =
    mongoose.models.Customer || mongoose.model('Customer', customerSchema);
