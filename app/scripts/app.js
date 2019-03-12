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
    })
  }]);
