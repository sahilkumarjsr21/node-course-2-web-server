const express=require('express');
const hbs= require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;

var app=express();
/**
 * script is nothing more than a command that we run from a commmand line. "scripts"->> in package.json
 */
hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper('getDate',()=>{
    return new Date().getFullYear();
    //return 'Test';
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.set('view engine','hbs');//key value pair (key,value)
app.use(express.static(__dirname+"/public"));//MiddleWare.If express doesn't provide some functionality we can provide that functionality using a middleware 
//and teach the express to use.It can do anything like executing a code like loggong into screen or changing req or res object
//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

app.use((req,res,next)=>{
    var now=new Date().toString();
    console.log(`${now}:`);
    var log=`request is ${req.method}  ${req.url}`;
    fs.appendFile('server.log',log+"\n",(err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    console.log(`request is ${req.method}  ${req.url}`);

    next();
});

// app.use((req,res,next)=>{
//     res.render("maintainance.hbs");
//     next();
// });

app.get('/',(req,res)=>{

    //res.send("Hello Express!");//response for hhtp request if from an application this will be given back as the body data 
    // res.send({
    //     name:'Sahil',
    //     likes:['football','badminton']
    // });

    res.render("home.hbs",{
        TitlePage:'Home Page',
        HeadingPage:'Welcome to the server',
        PageTitle:"This is Home Page",  
        pageJump:'/about',
        pageJumpName:'About',
        //date:new Date().getFullYear(),
        pageDesc:'Yo this is home Page'

    });

});//when someone visits the root of the website then we're going to send some data back maybe a html page or json file
//register the handler for an http request
//1. argument url 2. argument function to return what to send back to the person who made the request 
//req=>contains the headers that were used, path, body and many more
//res=>response that we can give back from server comes with a hell lot of methods

app.get('/about',(req,res)=>{
   // res.send("About page");
   res.render("about.hbs",{
       PageTitle:'About Page',// the key value has to match with the key value at the hbs file
       //date:new Date().getFullYear(),
       pageJump:'/',
       pageJumpName:'Home',
       pageDesc:'yo this is about page'
   });
});
app.get('/bad',(req,res)=>{
    res.send({
        bad:'Bad Request'
    });
});
app.listen(port,()=>{
    console.log(`Server is up at ${port}`);
});// bind the server to listen to the port on our machine or web server
