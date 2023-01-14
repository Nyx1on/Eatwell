const fs = require('fs');
const path = require('path');

const express = require('express');
const uuid = require('uuid');

const resData = require('./utils/restaurant-data');

const app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({extended : false}));
app.use(express.static('public'));

app.get('/',function(req,res){
    res.render('index');
});

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

app.get('/confirm',function(req,res){
    res.render('confirm');          //passing the location of file(rendering ejs);
});

app.get('/about',function(req,res){
    res.render('about');            //passing the location of file(rendering ejs);
});

app.get('/restaurants',function(req,res){
    const storedRestaurants = resData.getStoredRestaurants();

    res.render('restaurants', {numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants,});            //passing the location of file;
});

app.get('/restaurants/:id',function(req,res){ //restaurants/r1 (r1/r2/r3....rn)
    const restaurantId = req.params.id;

    const storedRestaurants = resData.getStoredRestaurants();

    for(const restaurant of storedRestaurants){
        if(restaurant.id === restaurantId){
            return res.render('restaurants-details',{ restaurant: restaurant, });
        }
    }

    res.status(404).render("404");
});

app.use(function(req,res){
    res.status(404).render('404');
});

app.use(function(error,req,res,next){
    res.status(500).render('500');
});

app.listen(3000);