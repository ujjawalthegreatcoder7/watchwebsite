const mongoose = require("mongoose") ;

const reviewSchema = new mongoose.Schema({


    email : String ,
    createdAt : {
        type : Date ,
        default : Date.now() ,
    } ,
}) ;

const review = mongoose.model("Review" , reviewSchema) ;
module.exports = review ;
