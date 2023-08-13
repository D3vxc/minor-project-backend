const mangoose = require("mongoose");
const Schema = mangoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin = new Schema(
  {
    _id: ObjectId,
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
