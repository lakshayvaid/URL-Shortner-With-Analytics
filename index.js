const express=require('express');
const connectmongodb=require('./connection.js')
const urlRouter=require('./routes/url.js');

const app=express();

const path=require('path');

//middleware to handle json data
app.use(express.json());

//middleware to handle form data
app.use(express.urlencoded({extended:false}));

//to set the view engine as ejs 
app.set("view engine","ejs");
app.set('views',path.resolve("./views"));


//port
const port=8001;

//connecting mongodb
connectmongodb('mongodb://127.0.0.1:27017/short-url');

//connecting router
app.use('/',urlRouter);


app.listen(port,()=>{console.log("server started");})