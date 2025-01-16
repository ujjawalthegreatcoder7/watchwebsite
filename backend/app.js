const express = require("express") ;
const app = express() ;
const mongoose = require("mongoose") ;
const Listing = require("./models/listing") ;
const MongoUrl = "mongodb://127.0.0.1:27017/watch"
const ejsMate = require("ejs-mate") ; // help to create templates
const methoOverride = require("method-override") // isse hum POST request ko PUT request mein change kr sakte hai ya fir delete req. mein
const path = require("path") ;
const cors = require('cors');

app.set("view engine" , "ejs" ) ;
app.set ("views" , path.join(__dirname,"views") )
app.use(express.urlencoded({extended : true})) // it can't send files
app.use(methoOverride("_method"))
app.engine("ejs" , ejsMate ) ;
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.listen(7070 , () => {
    console.log("Server is listening to me RADHAji") ;
}) ;


main()
.then(() => {
console.log("Ho gya RADHA ji")
}).catch((err) => {
    console.log(err) ;
} )

// const allListings = [
//     Listing 
// ]

app.get("/radha/index" ,  async (req, res) => {
    const allListings = await Listing.find({})
    // res.render("./listings/index.jsx")
    res.json(allListings) ;
    console.log(allListings) ;
}  )

app.get("/radha/watchopeninfo" ,  async (req, res) => {
    const allListings = await Listing.find({})
    // res.render("./listings/index.jsx")
    res.json(allListings) ;
    console.log(allListings) ;
}  )

app.get("/radha/indexs" ,  async (req, res) => {
    const allListings = await Listing.find({})
    res.render("./listings/index.ejs" , allListings )
    // res.json(allListings) ;
    // console.log(allListings) ;
}  )



async function main() {
    await mongoose.connect(MongoUrl)
}

// app.get("/testListing" , (req,res) => {
//     let tempListings = [
//         {
//           title: "RADHA ji",
//           description: "RADHA ji krishna  ki hai",
//           image: "kwjefjoheirjick",
//           price: 316,
//           location: "vrindavan",
//           country: "india",
//         },
//         {
//             title: "RADHA ji",
//             description: "RADHA ji krishna  ki hai",
//             image: "kwjefjoheirjick",
//             price: 316,
//             location: "vrindavan",
//             country: "india",
//           },
//       ];

//       tempListings.forEach((itemforListings) => {    
//         let newListings = new Listing ({
//             title : itemforListings.title ,
//             description : itemforListings.description ,
//             image : itemforListings.image ,
//             price : itemforListings.price ,
//             location : itemforListings.location ,
//             country : itemforListings.country ,
//         }) ;
//         newListings.save() ;
//       } )
//       res.send("Listings ka toh hogya!")
// } ) ;

