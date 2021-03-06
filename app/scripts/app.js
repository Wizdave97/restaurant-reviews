'use strict';

/**
 * @ngdoc overview
 * @name restaurantReviewsApp
 * @description
 * # restaurantReviewsApp
 *
 * Main module of the application.
 */


angular
  .module('restaurantReviewsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ]).config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider.
    state('home',{
      url:'/home',
      templateUrl:'views/home.html',
      controller:"HomeCtrl as home"
    }).
    state('restaurant',{
      url:'/home/restaurant:id',
      templateUrl:'views/restaurantinfo.html',
      controller:'RestaurantinfoCtrl as restaurant'
    })
    
  }]);
  if(navigator.serviceWorker){
    navigator.serviceWorker.register('/sw.js').then(function(reg){
      console.log('Successful')
    }).catch(function(err){
      console.log(err)
    })
  }
