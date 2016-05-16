var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../../models');
var Day = models.Day;
var Restaurant = models.Restaurant;
var Activity = models.Activity;


router.get('/', function(req, res, next) {
  Day.findAll({})
  .then(function(day) {
    res.json(day);
  })
  .catch(next);
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  Day.findOne({
    where:{
      number : id,
    }
  })
  .then(function(day) {
    console.log("waves!");
    res.json(day);
  })
  .catch(next);
});

router.post('/:id', function(req, res, next) {
  var id = req.params.id;
  Day.create( {
    number: id
  })
  .then(function(day) {
    res.sendStatus(200);
  });
});

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  Day.findOne({
    where:{
      number : id,
    }
  })
  .then(function(day){
    day.destroy();
    res.sendStatus(200);
  })
  .catch(next);
});

router.post('/:id/hotels', function(req, res, next) {
  var dayId = req.params.id;
  var hotelId = req.body.hotelId;

  Day.findOne({
    where:{
      number : dayId,
    }
  })
  .then(function(day){
    return day.update({
      hotelId : hotelId
    });
  })
  .then(function(){
    res.sendStatus(200);
  })
  .catch(next);
});

router.post('/:id/restaurants', function(req, res, next) {
  var dayId = req.params.id;
  var restaurantId = req.body.restaurantId;

  Promise.join(Day.findOne({
    where:{
      number : dayId,
    }
  }),
  Restaurant.findOne({
    where:{
      id : restaurantId,
    }
  })
  ).spread(function(day, restaurant){
    return day.addRestaurant(restaurant);

  })
  .then(function(){
    res.sendStatus(200);
  })
  .catch(next);
});

router.post('/:id/activities', function(req, res, next) {
 var dayId = req.params.id;
 var activityId = req.body.activityId;

  Promise.join(Day.findOne({
    where:{
      number : dayId,
    }
  }),
  Activity.findOne({
    where:{
      id : activityId,
    }
  })
  ).spread(function(day, activity){
    return day.addActivity(activity);

  })
  .then(function(){
    res.sendStatus(200);
  })
  .catch(next);
});

router.delete('/:id/restaurants', function(req, res, next) {
  var dayId = req.params.id;
  var restaurantId = req.body.restaurantId;

  Day.findOne({
    where:{
      number : dayId,
    }
  }).then(function(day){
    day.removeRestaurant(restaurantId);
    res.sendStatus(200);
  })
  .catch(next);
});

router.delete('/:id/activities', function(req, res, next) {
  var dayId = req.params.id;
  var activityId = req.body.activityId;

  Day.findOne({
    where:{
      number : dayId,
    }
  }).then(function(day){
    day.removeActivity(activityId);
    res.sendStatus(200);
  })
  .catch(next);
});

router.delete('/:id/hotels', function(req, res, next) {
  var dayId = req.params.id;

  Day.findOne({
    where: {
      number: dayId
    }
  })
  .then(function(day) {
    day.destroy(day.hotelId);
    res.sendStatus(200);
  })
  .catch(next);
});



module.exports = router;