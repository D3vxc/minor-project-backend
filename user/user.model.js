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

        username: {
            type: String,
            require: true,
        },

        password: {
            type: String,
            require: true,
        },
    },
    { timestamps: true, strict: false }
);

module.exports = mongoose.model("User", User);
