const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new schema(
    {
        _id: ObjectId,
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







































































































