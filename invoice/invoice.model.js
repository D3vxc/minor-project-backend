const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoice = new Schema(
{
  order: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
  },
  issuedDate: { 
    type: Date, 
    default: Date.now 
  },
  dueDate: { 
    type: Date, 
    required: true 
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Unpaid', 'Cancelled'],
    default: 'Unpaid'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  items: [
    {
      product: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  customerDetails: {
    name: String,
    address: String,
    email: String
  },
  // Include any other relevant invoice fields
});

module.exports = mongoose.model('Invoice', invoice);
