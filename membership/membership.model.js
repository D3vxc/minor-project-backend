const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const membershipModel = new Schema(
  {
    id: ObjectId,
    PlanName: {
      type: String,
      required: true,
    },
    PlanPrice: {
      type: Number,
      required: true,
    },
    PlanType: {
      type: String,
      required: true,
    },
    GST: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("membership", membershipModel);
