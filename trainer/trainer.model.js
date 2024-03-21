const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const Trainer = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    image: {
      type: String,
      require: true,
    },

    specialty: {
      type: String,
      require: true,
    },

    experience: {
      type: Number,
      require: true,
    },

    rating: {
      type: Number,
      require: true,
    },

    socialHandling: [
      {
        instagram: {
          type: String,
          require: false,
        },

        facebook: {
          type: String,
          require: false,
        },
      },
    ],
  },

  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Trainer", Trainer);
