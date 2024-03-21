const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const Schedule = new Schema(
    {
        day : {
            type: String,
            require: true,
        },
        
        time : {
            type: Number,
            require: true,
        },
        
        type : {
            type: String,
            require: true,
        },

        workout : {
            type: String,
            require: true,
        },

        trainer : {
            type: String,
            require: true,
        },
    },
);