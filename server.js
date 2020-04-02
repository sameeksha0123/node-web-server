const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();

// //maintainence file
// app.use((req,res,next)=>{
//     res.render('maintainence.hbs')
// })
//middleware of express
app.use(express.static("public"));
//log routes middleware
app.use((req,res,next)=>{
    var now= new Date().toString();
    var log= `${now} ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log' , log + '\n' , (err)=>{
        if(err){
            console.log("Unable to access log in server.log ")
        }
    })
    next();
})
//templte using handlebars.js
app.set("view_engine",'hbs');
//partial parts of html code
hbs.registerPartials(__dirname + '/views/partials')
//helpers
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})
//routes
app.get('/home',(req,res)=>{
    // res.send('<h1>hello Express</h1>')
    // res.send({
    //     name:"web server in json form",
    //     array:[
    //         "arr1","arr2"
    //     ]
    // })
    res.render('home.hbs',{
        pageTitle:"Home Website",
        welcomeMessage:"You are on home page",
        // curretYear:new Date().getFullYear()
    });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:"About website",
        welcomeMessage:"You are on about page",
        // curretYear:new Date().getFullYear()
    })
})
//listen to port 3333
app.listen(3333,()=>{
    console.log("server is up pn port 3333")
})