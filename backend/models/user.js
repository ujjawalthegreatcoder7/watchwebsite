const mongoose = require("mongoose") ;

const passportlocalmongoose = require("passport-local-mongoose") ;

const userSchema = mongoose.Schema({
    email : {
        type : String ,
    },
})

userSchema.plugin(passportlocalmongoose) ; //it help to  implement username hashing salting password
module.exports = mongoose.model('userSchema' , userSchema ) ;
