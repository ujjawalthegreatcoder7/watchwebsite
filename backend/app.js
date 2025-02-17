const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const MongoUrl = "mongodb://127.0.0.1:27017/watch"
const ejsMate = require("ejs-mate"); // help to create templates
const methoOverride = require("method-override") // isse hum POST request ko PUT request mein change kr sakte hai ya fir delete req. mein
const path = require("path");
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/user");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: true })) // it can't send files
app.use(methoOverride("_method"))
app.use(express.json());
app.engine("ejs", ejsMate);
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.listen(7070, () => {
    console.log("Server is listening to me RADHAji");
});

const sessionOptions = {
    secret: "mysecretsuperstarkrishna",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 100,
        maxAge: 7 * 24 * 60 * 60 * 100,
        httpOnly: true,
    }
}

main()
    .then(() => {
        console.log("Ho gya RADHA ji")
    }).catch((err) => {
        console.log(err);
    })

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.post("/registeredUser", async (req, res) => {  // pehle in k liye get request bnegi phir vo form render krvaayegi phir vo form submit hone pr post request bhejegi aur vuha se data aayega phir register ho jaayega
    try {
        let { username, email, password } = req.body;
        let newUser = new user({
            email,
            username,
        });
        let registeredUser = await user.register(newUser, password);
        res.send(registeredUser);

        req.login(registeredUser, ((err) => {
            if (err) {
                return nextTick(err);
            }
            // res.redirect("/on page") ;
        }))

    } catch (err) {
        console.log(err);
    }
});


app.post('/signup', async (req, res) => {
    const {  username,email, password } = req.body;
    console.log('Data received:', { username, email, password });
  
    let newUser = new user({
        username,
        password,
    });

    let registeredUser = await user.register(newUser, password);
    res.send(registeredUser);

    
    req.login(registeredUser, ((err) => {
        if (err) {
            return nextTick(err);

        }
        // res.redirect("/on page") ;
    }))


    // Process the data as needed, then send a response back
    // res.json({ success: true, receivedData: req.body });
  });


// app.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), async (req, res) => {    // pehle in k liye get request bnegi phir vo form render krvaayegi phir vo form submit hone pr post request bhejegi aur vuha se data aayega phir register ho jaayega
//     res.send("Welcome to radha world u r logged in");
// })

app.post('/api/data', passport.authenticate("local", { failureRedirect: "/logins" }), (req, res) => {
    const { username,email, password } = req.body;
    console.log('Data received:', { username,email, password });
  
    // Process the data as needed, then send a response back
    // res.json({ success: true, receivedData: req.body });
  });

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return nextTick(err);
        }
        else{
            console.log("hogya log out")
        }
        // res.redirect("/on page") ;
    })
});


// const allListings = [
//     Listing 
// ]

app.get("/radha/index", async (req, res) => {
    const allListings = await Listing.find({})
    // res.render("./listings/index.jsx")
    res.json(allListings);
    console.log(allListings);
})



app.get("/radha/show/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    console.log(listing);
    res.json(listing);
})

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

