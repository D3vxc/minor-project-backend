const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

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
    addresses: {
      type: [AddressSchema],
      validate: [addressLimit, "{PATH} exceeds the limit of 3"], // Custom validation function
    },
  },
  { timestamps: true, strict: false }
);

function addressLimit(val) {
  return val.length <= 5;
}
module.exports = mongoose.model("User", User);
