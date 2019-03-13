'use strict';

/**
 * @ngdoc function
 * @name restaurantReviewsApp.controller:RestaurantinfoCtrl
 * @description
 * # RestaurantinfoCtrl
 * Controller of the restaurantReviewsApp
 */
angular.module('restaurantReviewsApp')
  .controller('RestaurantinfoCtrl',['mapService','$rootScope','$stateParams', function (mapService,$rootScope,$stateParams) {
      this.newMap=null;
      let self=this
      console.log($rootScope.restaurants)
      let id=$stateParams.id;
      for(let restaurant of $rootScope.restaurants){
        if(restaurant.id==id){
          this.currentRestaurant=restaurant;
          break;
        }
      }
      this.initMap = (lng,lat) => {
        self.newMap = L.map('map', {
              center: [lng,lat],
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
      let latlng=this.currentRestaurant.latlng
      this.initMap(latlng.lng,latlng.lat)
      mapService.mapMarkerForRestaurant(this.currentRestaurant,this.newMap)
  }]);
