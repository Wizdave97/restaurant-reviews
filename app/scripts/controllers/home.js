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
  .controller('HomeCtrl',['$http','mapService','$window','$rootScope',function ($http,mapService,$window,$rootScope) {
    let self=this;
    let markers=[];
    this.lng=40.72216;
    this.lat=-73.987501;
    var event=new Event('markers');
    $window.addEventListener('markers',function(){
      self.marker();
    })
    $http({url:'/data/restaurants.json',method:'GET'}).then((response)=>{
         self.restaurants=response.data.restaurants;
         $window.dispatchEvent(event);
         $rootScope.restaurants=response.data.restaurants;
         })
    mapService.initMap(this.lng,this.lat);

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
