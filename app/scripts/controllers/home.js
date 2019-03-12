'use strict';

/**
 * @ngdoc function
 * @name restaurantReviewsApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the restaurantReviewsApp
 */
angular.module('restaurantReviewsApp')
  .controller('HomeCtrl',['restaurantData', function (restaurantData) {
      this.restaurants=restaurantData.getRestaurants()
      console.log(this.restaurants)
  }]);
