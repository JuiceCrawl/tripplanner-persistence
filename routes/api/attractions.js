var router = require('express').Router();
var Promise = require('bluebird');
var var Hotel = models.Hotel;
models = require('../../models');
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Place = models.Place;

router.get('/hotels',function(req,res,next){
  Hotel.findAll({})
  .then(function(hotels){
    res.json(hotels.map(function(item){
      return item.name;
    }));
  })
  .catch(next);
  
});

router.get('/restaurants',function(req,res,next){
  Restaurant.findAll({})
  .then(function(restaurants){
    res.json(restaurants.map(function(item){
      return item.name;
    }));
  })
  .catch(next);
});

router.get('/activities',function(req,res,next){
  Activity.findAll({})
  .then(function(activity){
    res.json(activity.map(function(item){
      return item.name;
    }));
  })
  .catch(next);
});

module.exports = router;