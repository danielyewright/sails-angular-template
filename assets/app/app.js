angular.module('app', [
	'ui.router',
	'adaptiveTemplating',
	'ngSails',
]);

angular.module('app').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/pagenotfound');
	$stateProvider.state('dashboard', {
		url: '/',
		templateUrl:'app/app.html',
		controller:'AppController'
	});
});

angular.module('app').config(['$sailsProvider', function($sailsProvider) {
	io.sails.environment = 'production';
	$sailsProvider.url = 'http://127.0.0.1:1337';
}]);

angular.module('app').run(function (adaptiveTemplating, $window) {
	var isMobile = $window.matchMedia('(max-width: 767px)').matches;
	adaptiveTemplating.addTest('mobile', isMobile);
	var isDesktop = $window.matchMedia('(min-width: 767px)').matches;
	adaptiveTemplating.addTest('desktop', isDesktop);
});

angular.module('app').controller('AppController', ['$scope', '$location', '$sails', function ($scope, $location, $sails) {
	
}]);
