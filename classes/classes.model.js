const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const classes = new Schema(
    {
        name: {
            type : String,
            require : true,
        },
        description : {
            type : String,
            require : true,
        },
        duration : {
            type : Number,
            require : true,
        }, 

       trainer : {
            type : String,
            require : true,
        },
        
        image : {
            type : String,
            require : true,
        }, 
        
        date : {
            type : String,
            require : true,
        },
        time : {
            type : String,
            require : true,
        },
    },
    { timestamps: true, strict: false }
);

module.exports = mongoose.model("classes", classes);