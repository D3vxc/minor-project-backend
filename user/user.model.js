const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: {
      type: String,
      require: true,
    },

    phone: {
      type: Number,
      require: true,
    },

    name: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("User", User);
