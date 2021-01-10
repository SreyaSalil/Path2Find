const mongoose=require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const reporterSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    relation:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:String,
       required:true
    },
    rsn:{
        type:String,
       required:true
    },
    MSN:{
        type:String,
        required:true,
        default:'none'
    },
})
reporterSchema.plugin(passportLocalMongoose);
const Reporter = mongoose.model('Reporter', reporterSchema);
module.exports = Reporter;