const express = require('express');

const resData = require('../utils/restaurant-data');

const router = express.Router();

router.get('/confirm',function(req,res){
    res.render('confirm');          //passing the location of file(rendering ejs);
});

router.get('/restaurants',function(req,res){
    const storedRestaurants = resData.getStoredRestaurants();

    res.render('restaurants', {numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants,});            //passing the location of file;
});

router.get('/recommend',function(req,res){
    res.render('recommend');            //passing the location of file;
});

router.post('/recommend', function(req,res){
    const restaurants = req.body;
    restaurants.id = uuid.v4();
    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.push(restaurants);

    resData.storeRestaurants(storedRestaurants);

    res.redirect('/confirm');
});

router.get('/restaurants/:id',function(req,res){ //restaurants/r1 (r1/r2/r3....rn)
    const restaurantId = req.params.id;

    const storedRestaurants = resData.getStoredRestaurants();

    for(const restaurant of storedRestaurants){
        if(restaurant.id === restaurantId){
            return res.render('restaurants-details',{ restaurant: restaurant, });
        }
    }

    res.status(404).render("404");
});

module.exports = router;