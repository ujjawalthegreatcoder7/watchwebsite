const mongoose = require("mongoose") ;
const review = require("./review")


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
    msf : String ,

    reviews :   [ {// 
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Review" ,
}] , 

}) ;

let Listing = mongoose.model("Listing" , ListingSchema);
module.exports = Listing ;
