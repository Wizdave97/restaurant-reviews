'use strict';

/**
 * @ngdoc function
 * @name restaurantReviewsApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the restaurantReviewsApp


 }
 */
angular.module('restaurantReviewsApp')
  .controller('HomeCtrl',['$http','mapService','$window', function ($http,mapService,$window) {
    let self=this;
    let markers=[];
    var event=new Event('markers');
    $window.addEventListener('markers',function(){
      self.marker();
    })
    $http({url:'/data/restaurants.json',method:'GET'}).then((response)=>{
         self.restaurants=response.data.restaurants;
         $window.dispatchEvent(event);
         })
    mapService.initMap();

    this.marker =function (){
      for(let restaurant of self.restaurants){
        if(restaurant.name==self.location || restaurant.cuisine_type==self.type){
          markers.push(mapService.mapMarkerForRestaurant(restaurant,mapService.newMap));
          console.log(self.location)
        }
        else if(!self.location && !self.type){
           markers.push(mapService.mapMarkerForRestaurant(restaurant,mapService.newMap));
           ;
        }
      }
    }
    this.filterMap=function(){
      for(let marker of markers){
        marker.remove();
      }
      markers=[];
      $window.dispatchEvent(event)
    }
  }]);
