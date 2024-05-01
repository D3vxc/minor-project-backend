const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const order = new Schema({
    products: [
      {
        product: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Product', 
          required: true 
        },
        quantity: { 
          type: Number, 
          required: true, 
          min: [1, 'Quantity can not be less then 1.'] 
        },
        price: { 
          type: Number, 
          required: true 
        }
      }
    ],
    customer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    orderDate: { 
      type: Date, 
      default: Date.now 
    },
    status: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing'
    },
    // Include any other relevant order fields
  });
  
  module.exports = mongoose.model('Order', order);
  