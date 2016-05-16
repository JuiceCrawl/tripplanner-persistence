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

/*
$(document.body).on('click', 'button[data-action="addSelectionToTrip"]', function(event) {
    //console.log(this, event)

    var dst = $(this.dataset.destinationList)

    console.log($(this.dataset.sourceSelect))

    $.get('/api')
    
    Array.from(
      // Get all selected options (usually just one, but why not support many?)
      $(this.dataset.sourceSelect)[0].selectedOptions)
      .forEach(function(option) {
        // Create a new list item with a delete button
        var li = $(`<li class=itinerary-item>
                     ${option.textContent}
                     <button data-action="deleteFromTrip" class="btn btn-xs btn-danger remove btn-circle">x</button>
                   </li>`)[0]
        
        // Add to the destination list
        dst.append(li)

        option.getAttribute('place-latitude')
        
        // Draw a marker on the map
        li.marker = drawMarker(option.attraction.place.type,
                               option.attraction.place.location)
    });
  });
*/



});
