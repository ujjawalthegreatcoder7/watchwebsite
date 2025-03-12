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
// const express = require("express");
const OTP = require("./models/otp");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const router = express.Router();
const Reviews = require("./models/review") ;
const review = require("./models/review");

require("dotenv").config(); 

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


// ✅ Configure Nodemailer securely
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user: "ujjuarora5@gmail.com", // Replace with your email
      pass: "xalm vkma cfgk zhct",  // Use app password from Google or .env
    },
  });
  
  // ✅ Send OTP Route
  app.post("/sendotp", async (req, res) => {
    try {
      const { email } = req.body;
  console.log(email)
      // ✅ Generate a 6-digit OTP
      const otpCode = otpGenerator.generate(6, { digits: true, alphabets: false, specialChars: false });
  console.log(otpCode) ;
      // ✅ Save OTP with Expiry Time (5 minutes)
      const otpEntry = new OTP({ email, otp: otpCode, createdAt: Date.now() });
      await otpEntry.save();
  
      // ✅ Send OTP via Email
      const mailOptions = {
        from: "ujjuarora5@gmail.com" ,
        to: email ,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otpCode}. It will expire in 5 minutes.`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending OTP:", error);
          return res.status(500).json({ success: false, error: "Failed to send OTP" });
        }
        res.json({ success: true, message: "OTP sent successfully!" });
      });
    } catch (error) {
      console.error("Error in send-otp:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });
  
  // ✅ Verify OTP Route
  app.post("/verify-otp", async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      // ✅ Find OTP in Database
      const validOTP = await OTP.findOne({ email, otp });
  
      if (!validOTP) {
        return res.status(400).json({ success: false, error: "Invalid or expired OTP" });
      }
  
      // ✅ Check OTP Expiry (5 minutes)
      const currentTime = Date.now();
      const otpTime = new Date(validOTP.createdAt).getTime();
      const timeDiff = (currentTime - otpTime) / 60000; // Convert to minutes
  
      if (timeDiff > 5) {
        return res.status(400).json({ success: false, error: "OTP expired" });
      }
  
      // ✅ OTP Verified
      res.json({ success: true, message: "OTP verified successfully!" });
    } catch (error) {
      console.error("Error in verify-otp:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });


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
    res.json({ success: true, receivedData: req.body });
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

// Revew saving backend
app.post("/review/:id/save", async (req, res) => {
  try {
    const { id } = req.params ;
    const {email} = req.body ;
    console.log(id) ;
    console.log(email) ;

    let listing = await Listing.findById(req.params.id) ;
    let newReview = new Reviews({ email : email }) ;

    listing.reviews.push(newReview) ;
    console.log(newReview)
    await newReview.save() ;
    await listing.save() ;


    // Send a success response
    res.status(200).json({ message: "Review saved successfully!" });
  } 
  catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  ow i will create get request to fetch my reviews
app.get("/review/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching reviews for listing ID:", id);

    // ✅ Find the listing and populate its reviews
    const listing = await Listing.findById(id).populate("reviews");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" }); // ✅ Use return to prevent further execution
    }

    console.log("Fetched reviews:", listing.reviews);
    return res.status(200).json(listing.reviews); // ✅ Use return

  } catch (err) {
    console.error("Error fetching reviews:", err);
    return res.status(500).json({ message: "Error fetching reviews", error: err.message }); // ✅ Use return
  }
});

// render all delivery details here
app.post('/delivery/data', async (req, res) => {
  try {
    const { address1, address2, city, zip } = req.body;
    
    console.log('Data received:', { address1, address2, city, zip });

    // If you are saving to a database, insert the logic here.

    // Send a success response to the frontend
    res.status(200).json({ message: "Delivery details received successfully!", data: { address1, address2, city, zip } });

  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})


//app review see
// app.get("/review/see" , (req,res) => {
//   res.send(listing.reviews) ;
// })

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


