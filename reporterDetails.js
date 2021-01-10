const Reporter = require('./models/reporter');
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/Path2Find', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

    const reporters = [
        {
            name:'Sreya Salil',
            email:'sreya1805@gmail.com',
            password:'1234'
        },
        {
            name:'aaa',
            email:'aaa@gmail.com',
            password:'4567'
        },
        {
            name:'bbb',
            email:'bbb@gmail.com',
            password:'bb34'
        },
        {
            name:'ccc',
            email:'ccc@gmail.com',
            password:'12cc'
        },
        {
            name:'dddd',
            email:'dddd@gmail.com',
            password:'1dd4'
        },
    ]
    
Reporter.insertMany(reporters)
.then(p=>{
    console.log(p)
})
.catch(e=>{
    console.log(e)
})