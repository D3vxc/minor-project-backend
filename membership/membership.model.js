const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const membershipModel = new Schema(
  {
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
    WhatWeOffers: {
      type: Array,
      required: true,
    },
    Discounts: {
      type: String,
      required: true,
    },
    Duration: {
      type: Number,
      required: true,
    },
    FreeTrial: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("membership", membershipModel);
