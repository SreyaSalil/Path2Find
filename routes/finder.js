const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Finder = require('../models/finder');
const ExpressError = require('../utils/ExpressError');

//Finder Routes
router.get('/dashboard', catchAsync(async(req,res)=>{
    finders = await Finder.find({})
    console.log(finders);
   // found.push(finders);
    foundmsn = finders[finders.length-1].foundMSN;
   console.log(foundmsn);
    res.render("finder/dashboard",{finders});

}));

router.get('/finderReg', async(req,res)=>{
    res.render('finder/finderReg');
});

router.post('/',  catchAsync(async(req,res)=>{
    const newfind= new Finder(req.body);
 
    await newfind.save();
    res.redirect('/finder/dashboard')
    
}));


module.exports = router;