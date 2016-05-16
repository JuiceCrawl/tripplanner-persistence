var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Place = models.Place;

router.get('/',function(req,res,next){
  var hotelList = Hotel.findAll({
    include: [Place]
  });

  var restaurantList = Restaurant.findAll({
    include: [Place]
  });

  var activityList = Activity.findAll({
    include: [Place]
  });

  Promise.all(
    [hotelList, restaurantList, activityList])
  .spread(function(hotelList, restaurantList, activityList) {
    res.json({
      hotels: hotelList,
      restaurants: restaurantList,
      activities: activityList
    });
  })
    .catch(next);

});



module.exports = router;