angular.module('lovelace', [
	'ngMaterial',
	'ui.router',
]).config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');
}]);
