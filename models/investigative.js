const mongoose=require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const investigatorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
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
    isn:{
        type:String,
        required:true
    },
    MSN:{
        type:[String],
        default:[]
    }
})
investigatorSchema.plugin(passportLocalMongoose);
const Investigator = mongoose.model('Investigator', investigatorSchema);
module.exports = Investigator;