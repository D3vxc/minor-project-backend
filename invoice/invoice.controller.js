// InvoiceController.js
const Invoice = require('../invoice/invoice.model');
const Order = require('../order/order.model');

const createInvoice = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId).populate('products.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Calculate total amount and other invoice properties based on the order
    const totalAmount = order.products.reduce((acc, { quantity, price }) => acc + quantity * price, 0);

    const newInvoice = new Invoice({
      order: order._id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      totalAmount,
      items: order.products.map(({ product, quantity }) => ({
        product: product.name, // Assuming product has a name property
        quantity,
        price: product.price // Assuming product has a price property
      })),
      customerDetails: {
        name: order.customer.name, // Assuming customer has a name property
        address: order.customer.address, // Assuming customer has an address property
        email: order.customer.email // Assuming customer has an email property
      },
      // ...
    });

    await newInvoice.save();

    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInvoice
};
