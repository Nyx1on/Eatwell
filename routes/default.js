const { Router } = require('express');
const express = require('express');

const router =  express.Router();

router.get('/',function(req,res){
    res.render('index');
});

router.get('/about',function(req,res){
    res.render('about');            //passing the location of file(rendering ejs);
});

module.exports = router;