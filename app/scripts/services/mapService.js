'use strict';

/**
 * @ngdoc service
 * @name restaurantReviewsApp.restaurantData
 * @description
 * # restaurantData
 * Service in the restaurantReviewsApp.
 */
angular.module('restaurantReviewsApp')
  .service('mapService',['$http', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.lng=40.72216;
    this.lat=-73.987501;
    this.newMap=null;
    let self=this;
    this.initMap = () => {
      self.newMap = L.map('map', {
            center: [self.lng,self.lat],
            zoom: 12,
            scrollWheelZoom: true
          });
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
        mapboxToken: 'pk.eyJ1Ijoid2l6ZGF2ZTk3IiwiYSI6ImNqdDV2bGEwdDA5dTM0M3BkZWt1MHRuY2sifQ.xNti24QiijI3uHK-zTF79g',
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
      }).addTo(self.newMap);
    }
    this.mapMarkerForRestaurant=function(restaurant, map) {
     // https://leafletjs.com/reference-1.3.0.html#marker
     let marker=L.marker([restaurant.latlng.lat, restaurant.latlng.lng]).addTo(map)
    .bindPopup(restaurant.name)
    .openPopup();
    return marker
   }
}]);
