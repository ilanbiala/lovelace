angular.module('lovelace.landing');

angular.module('lovelace', [
	'ngMaterial',
	'ui.router',
	'lovelace.landing',
]).config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');
}]);
