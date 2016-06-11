var app = angular.module('superheroApp', ['addSuperheroCtrl', 'galleryCtrl','detailCtrl', 'ngRoute', 'angular-filepicker'])
    .config(function($routeProvider, filepickerProvider){
		//The route provider handles the client request to switch route
        $routeProvider.when('/addSuperhero', {
            templateUrl: 'partials/addSuperhero.ejs',
			controller: 'addSuperheroController'
        })
		.when('/gallery', {
            templateUrl: 'partials/gallery.ejs',
			controller: 'galleryController'
        })
		.when('/detail/:id', {
            templateUrl: 'partials/detail.ejs',
			controller: 'detailController'
        })
		//Redirect to addSuperhero in all the other cases.
		.otherwise({redirectTo:'/addSuperhero'});
		//Add the API key to use filestack service
		filepickerProvider.setKey('A9VBGvvZOSHqI5QwS5a73z');
});
