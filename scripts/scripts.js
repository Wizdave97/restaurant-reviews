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
    
    this.newMap=null;
    let self=this;
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
    this.mapMarkerForRestaurant=function(restaurant, map) {
     // https://leafletjs.com/reference-1.3.0.html#marker
     let marker=L.marker([restaurant.latlng.lat, restaurant.latlng.lng]).addTo(map)
    .bindPopup(restaurant.name)
    .openPopup();
    return marker
   }
}]);

angular.module('restaurantReviewsApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/home.html',
    "<section class=\"map-container\"> <div id=\"map\" class=\"map\"> </div> </section> <section class=\"restaurants\"> <div class=\"filters\"> <div class=\"\"> <select ng-change=\"home.filterMap()\" ng-model=\"home.location\"> <option value=\"Queens\">Queens</option> <option value=\"Manhattan\">Manhattan</option> <option value=\"Brooklyn\">Brooklyn</option> <option value=\"\">All Neighborhoods</option> </select> </div> <div class=\"\"> <select ng-change=\"home.filterMap()\" ng-model=\"home.type\"> <option value=\"Asian\">Asian</option> <option value=\"Mexican\">Mexican</option> <option value=\"American\">American</option> <option value=\"Pizza\">Pizza</option> <option value=\"\">All Cuisines</option> </select> </div> </div> <div class=\"restaurant-cards\"> <h4 ng-if=\"!home.restaurants\">Loading...</h4> <div class=\"card\" ng-repeat=\"restaurant in home.restaurants  | filter:home.location |filter:home.type\"> <div class=\"card-image\"> <img ng-src=\"img/{{restaurant.photograph}}\" alt=\"{{restaurant.name}}\"> </div> <div class=\"card-details\"> <h3 class=\"restaurant-name\">{{restaurant.name}}</h3> <p class=\"restaurant-location\"><strong>Neighbourhood</strong>: {{restaurant.neighborhood}}</p> <p class=\"restaurant-location\"><strong>Address</strong>: {{restaurant.address}}</p> <p class=\"restaurant-location\"><strong>Cuisine Type</strong>: {{restaurant.cuisine_type}}</p> <button class=\"btn\" type=\"button\" name=\"button\"><a ui-sref=\"restaurant({id:restaurant.id})\">View Details</a></button> </div> </div> </div> </section>"
  );


  $templateCache.put('views/restaurantinfo.html',
    "<section class=\"res-details\"> <div class=\"card-details\"> <h3 class=\"restaurant-name\">{{restaurant.currentRestaurant.name}}</h3> <p class=\"restaurant-location\"><strong>Neighbourhood</strong>: {{restaurant.currentRestaurant.neighborhood}}</p> <p class=\"restaurant-location\"><strong>Address</strong>: {{restaurant.currentRestaurant.address}}</p> <p class=\"restaurant-location\"><strong>Cuisine Type</strong>: {{restaurant.currentRestaurant.cuisine_type}}</p> </div> </section> <section class=\"map-container-single\"> <div id=\"map\" class=\"map-single\"> </div> </section> <section class=\"details\"> <div class=\"res-image\"> <img ng-src=\"img/{{restaurant.currentRestaurant.photograph}}\" alt=\"{{restaurant.currentRestaurant.name}}\"> </div> <div class=\"res-table\"> <table> <tr class=\"table-heading\"> <h4>Operating Hours</h4> </tr> <tr ng-repeat=\"(day,time) in restaurant.currentRestaurant.operating_hours\"> <td>{{day}}</td> <td>{{time}}</td> </tr> </table> </div> </section> <section class=\"res-reviews\"> <div class=\"review-card\" ng-repeat=\"review in restaurant.currentRestaurant.reviews\"> <h4>Reviewer: {{review.name}}</h4> <p><strong>Date</strong>: {{review.date}}</p> <p><strong>Rating</strong>: {{review.rating}}</p> <p><em>{{review.comments}}</em></p> </div> </section>"
  );

}]);
