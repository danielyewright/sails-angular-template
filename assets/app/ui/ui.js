angular.module('ui', [
  'ui.router',
  'ngSails'
]);

angular.module('ui').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('ui', {
    url: '/', // For testing only. Remove once the app is running properly
    templateUrl: 'app/ui/ui.html',
    controller: 'UIController'
  })
}]);

angular.module('ui').controller('UIController', ['$scope', '$state', '$sails', function($scope, $state, $sails) {
  
}]);
