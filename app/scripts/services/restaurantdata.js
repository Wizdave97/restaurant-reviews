'use strict';

/**
 * @ngdoc service
 * @name restaurantReviewsApp.restaurantData
 * @description
 * # restaurantData
 * Service in the restaurantReviewsApp.
 */
angular.module('restaurantReviewsApp')
  .service('restaurantData',['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    let self=this
    this.getRestaurants=function(){
      $http.get('/data/restaurants.json').then(function(response){
        return response.data.restaurants;
      })
    }


  }]);
