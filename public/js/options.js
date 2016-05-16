$(document).ready(function(){
  $.ajax({
    method: 'GET',
    url: '/api',
    success: function(attractions) {
      //console.log("hello")

        attractions.hotels.forEach(function(hotel) {
      //console.log(hotel.name)
          $('#hotel-choices').append('<option>' + hotel.name + '</option>')
      })

        attractions.restaurants.forEach(function(restaurant) {
          $('#restaurant-choices').append('<option>' + restaurant.name + '</option>')
        })

        attractions.activities.forEach(function(activity) {
          $('#activity-choices').append('<option>' + activity.name + '</option>')
        })
    },
    error: function(err) {
      console.log(err)
    }
  })
})

