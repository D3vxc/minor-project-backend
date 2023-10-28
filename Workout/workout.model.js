const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const workout = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    numberOfSets: {
      type: Number,
      require: true,
    },

    repetition: {
      type: Number,
      require: true,
    },

    restTime: {
      type: Number,
      require: true,
    },
    workoutType: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("workout", workout);
