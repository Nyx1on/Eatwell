const fs = require('fs');
const path = require('path');

const express = require('express');
const uuid = require('uuid');

const resData = require('./utils/restaurant-data');
const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({extended : false}));
app.use(express.static('public'));

app.use('/', defaultRoutes );
app.use('/', restaurantRoutes );

app.get('/recommend',function(req,res){
    res.render('recommend');            //passing the location of file;
});

app.post('/recommend', function(req,res){
    const restaurants = req.body;
    restaurants.id = uuid.v4();
    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.push(restaurants);

    resData.storeRestaurants(storedRestaurants);

    res.redirect('/confirm');
});

app.use(function(req,res){
    res.status(404).render('404');
});

app.use(function(error,req,res,next){
    res.status(500).render('500');
});

app.listen(3000);