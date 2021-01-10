const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Missing = require('../models/missing');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn } = require('../middleware');

let finders;
let miss1;
let foundmsn;
let tobefound;
let invmsn;

//Missing Person Routes
router.get('/missReg', async(req,res)=>{
    res.render('miss/missReg');
});

router.get('/dashboard1',  catchAsync(async(req,res)=>{
    miss1 = await Missing.find({})
    console.log(miss1);
    var i=0;
    tobefound=miss1.length;
    console.log(tobefound);
        while(i<miss1.length){
        if(miss1[i].msn==invmsn){
            if(miss1[i].status){
                console.log(miss1[i].msn);
            Missing.deleteOne({ msn: invmsn  }, function(err) {
                if (!err) {
                    
                }
                else {
                        
                }
            });
            }
        }
       i++;
    }
    res.render("miss/dashboard1",{miss1});
}));

router.post('/',  catchAsync(async(req,res)=>{
    const newMiss= new Missing(req.body);
    console.log(newMiss)
    // db.collection('missingpeople').remove(foundmsn, function(err, result) { 
    //     res.send( (result === 1) ? { msg: '' } : { msg: 'error: '+ err } );
    // });  
    
    await newMiss.save();
    req.flash('success', 'Successfully registered the missing case');
    res.redirect('miss/dashboard1')
}));

router.get('/:id',  catchAsync(async(req,res)=>{
    const missDetails= await Missing.findById(req.params.id);
    if (!missDetails) {
        req.flash('error', 'Cannot find that missing person');
        return res.redirect('/miss/dashboard1');
    }
    res.render('miss/details',{missDetails});
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async(req,res)=>{
    const missDetails= await Missing.findById(req.params.id);
    res.render('miss/edit',{missDetails});
}));

router.put('/:id',  catchAsync(async(req,res)=>{
    const{id}=req.params;
    const missDetails= await Missing.findByIdAndUpdate(id,{...req.body});
    res.redirect(`/miss/${missDetails._id}`)
}));

module.exports = router;