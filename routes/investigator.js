const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Investigator = require('../models/investigative');
const ExpressError = require('../utils/ExpressError');


//Investigator Routes
router.get('/dashboard',  catchAsync(async(req,res)=>{
    const investigator = await Investigator.find({})
    console.log(investigator);
    invmsn=investigator[investigator.length-1].MSN;
    res.render("inv/dashboard",{investigator});
}));

router.get('/invReg', async(req,res)=>{
    res.render('inv/invReg');
});

router.post('/',  catchAsync(async(req,res)=>{
    const newInv= new Investigator(req.body);
    console.log(newInv)
    await newInv.save();
    res.redirect('inv/dashboard')
}));

module.exports = router;