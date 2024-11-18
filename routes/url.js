const express=require('express');
const Url = require('../models/url');
const {handleposturl,handlegetfromshortid,handlegetanalytics}=require('../controllers/url');
const Router=express.Router();

Router.route('/').get( (req,res)=>{
   return   res.render('home');
});

Router.route('/url/').post(handleposturl);

Router.route('/url/shortid/:shortid').get(handlegetfromshortid);

Router.route('/analytics/:shortid').get(handlegetanalytics);
module.exports=Router;