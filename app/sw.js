let staticCacheName='restaurant-reviews-v2';
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/index.html',
        "bower_components/angular/angular.js",
        "bower_components/angular-animate/angular-animate.js",
        "bower_components/angular-cookies/angular-cookies.js",
        "bower_components/angular-resource/angular-resource.js",
        "bower_components/angular-sanitize/angular-sanitize.js",
        "bower_components/angular-touch/angular-touch.js",
        "bower_components/angular-ui-router/release/angular-ui-router.js",
        'https://fonts.googleapis.com/css?family=Open+Sans',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
        "scripts/app.js",
        "scripts/controllers/home.js",
        "scripts/controllers/restaurantinfo.js",
        "scripts/services/mapService.js",
        "views/home.html",
        "views/restaurantinfo.html",
        "styles/home.css",
        "styles/main.css",
        "styles/restaurantinfo.css",
        "data/restaurants.json",
        "img/1.jpg",
        "img/2.jpg",
        "img/3.jpg",
        "img/4.jpg",
        "img/5.jpg",
        "img/6.jpg",
        "img/7.jpg",
        "img/8.jpg",
        "img/9.jpg",
        "img/10.jpg"
      ]);
    })
  );
});
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-reviews') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  let reqUrl= new URL(event.request.url)
  if(reqUrl.origin==location.origin){
    if(reqUrl.pathname==="/"){
      event.respondWith(
        caches.match('/index.html')
      )
      return;
    }
  }
  event.respondWith(
    caches.match(event.request.url).then(function(response){
      return response||fetch(event.request)
    })
  )
})
