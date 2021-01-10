const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const Reporter = require('../models/reporter');
const ExpressError = require('../utils/ExpressError');


//reporter Routes
router.get('/dashboard',  catchAsync(async(req,res)=>{
    const reporter = await Reporter.find({})
    // console.log(reporter);
    // var i=0, flag=0;
    // //console.log(reporter[reporter.length-1].MSN);
    // console.log(tobefound);
    // while(i<tobefound){
    //     console.log(reporter[reporter.length-1].MSN);
    //     if(miss1[i].msn==reporter[reporter.length-1].MSN){
    //         console.log("Already registered");
    //         break;
    //     }
    //     else{
    //         flag=1;
    //     }
    //     i++;
    // }
    // if(flag==1)
    // console.log("Isnt registered in the missing person's list, please fill the form");
    res.render("rep/dashboard",{reporter});
}));

router.get('/repReg', async(req,res)=>{
    res.render('rep/repReg');
});

router.post('/', catchAsync(async (req, res, next) => {
    try {
        const {username,email,relation,address,contact,rsn,MSN,password } = req.body;
        const newRep = new Reporter({username,email,relation,address,contact,rsn,MSN});
        const registeredUser = await Reporter.register(newRep, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Reporter sucessfully registered!');
            res.redirect('/miss/missReg');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/rep/repReg');
    }
}));

router.get('/login', async(req,res)=>{
    res.render('rep/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/miss/dashboard1';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/');
})
module.exports = router;