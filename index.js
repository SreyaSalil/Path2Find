const express =require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const fs = require('fs'); 
const ejsMate=require('ejs-mate')
const session = require('express-session');
const flash = require('connect-flash');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');
const LocalStrategy = require('passport-local');
var bodyParser = require('body-parser'); 
require('dotenv/config'); 

const Reporter = require('./models/reporter');

const reporterRoute = require('./routes/reporter');
const investigatorRoute = require('./routes/investigator');
const missingRoute = require('./routes/missing');
const finderRoute = require('./routes/finder');

let finders;
let miss1;
let foundmsn;
let tobefound;
let invmsn;

mongoose.connect('mongodb://localhost:27017/Path2Find', { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex:true})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    });
    

app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Reporter.authenticate()));

passport.serializeUser(Reporter.serializeUser());
passport.deserializeUser(Reporter.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/rep', reporterRoute)
app.use('/inv', investigatorRoute)
app.use('/miss', missingRoute)
app.use('/finder', finderRoute)


// index get response
app.get('/',  catchAsync(async(req,res)=>{
    const reporter = await Reporter.find({})
    console.log(reporter);
    res.render("index");
}));


//Handle all errors
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


//listening port for the app
app.listen(3000,()=>{
    console.log("APP IS LISTENING ON PORT 3000");
});