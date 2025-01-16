const mongoose = require("mongoose") ;

const ListingSchema = new mongoose.Schema({
    title : {
        required : true ,
        type : String ,
    } ,
    description : String ,
    image : {
        type : String ,
    } ,
    imageformen : {
        type : String ,
       } ,
       imageforwomen : {
        type : String ,
       } ,
       imageforbrand : {
        type : String ,
       } ,
       imageforsmart : {
        type : String ,
       } ,
            price : Number ,
    country : String ,
    location : String ,
}) ;

let Listing = mongoose.model("Listing" , ListingSchema);
module.exports = Listing ;
