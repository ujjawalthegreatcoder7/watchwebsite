const mongoose = require("mongoose") ;
const initData = require("./data.js") ;
const Listing = require("../models/listing.js")  // yuha se collection create hogi
const MongoURL = "mongodb://127.0.0.1:27017/watch" ;

main()
.then(() => {
console.log("Ho gya RADHA ji")
}).catch((err) => {
    console.log(err) ;
} )

async function main() {
    await mongoose.connect(MongoURL)
}

const initDB = async() => {
   await Listing.deleteMany({}) ;            //... se humaara puraana data + owner save ho rha hai  
   await Listing.insertMany(initData.data)
   console.log("Data was initialzed")
}

initDB()
 
