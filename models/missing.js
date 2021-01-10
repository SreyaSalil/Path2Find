
const mongoose = require('mongoose');
const missingPersonSchema=new mongoose.Schema({
  //
  name:{
    type: String,
    required:true
  },
  gender:{
    type: String,
    required:true,
  },
  age:{
    type: Number,
    required:true
  },
  inputdateofbirth:{
    type: String,
    required:true
  },
  languages:{
    type: String,
    required:true
  },
  phyCond:{
    type: String,
    required:true
  },
  dateMissing:{
    type: String,
  required:true
  },
  missingTime:{
    type: String,
    required:true
  },
  regDate:{
    type: String,
    required:true
  },
  status:{
    type: Boolean,
    required: true,
    default: false
  },
  lastSeen:{
    type: String,
    required:true
  },
  medCond:{
    type: String,
   required:true
  },
  img:
   {
    type: String,
    required:true
   },
  isn:{
    type: String,
    required:true
  },
  msn:{
    type: String,
    required:true
  },
})
const MissingPerson=mongoose.model('Missing', missingPersonSchema);
module.exports=MissingPerson;
