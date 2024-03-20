const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },

    price: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Product", Product);
