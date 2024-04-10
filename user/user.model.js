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
    membershipPlanDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "membership",
      default: "66163b18f24beac8fc046591",
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("User", User);
