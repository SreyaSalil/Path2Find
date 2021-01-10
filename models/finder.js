const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const finderSchema=new mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  email:{
    type: String,
    required:true
  },
  password:{
    type: String,
    required:true
  },
  foundMSN:{
    type: String,
    required:true
    
  },
  address:{
    type: String,
    required:true
  },
  contact:{
    type:String,
    required:true
  }
})
finderSchema.plugin(passportLocalMongoose);
const Finder=mongoose.model('Finder', finderSchema);
module.exports=Finder;
