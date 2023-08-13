const mangoose = require("mongoose");
const Schema = mangoose.Schema;

const Admin = new Schema(
  {
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mangoose.model("Admin", Admin);
