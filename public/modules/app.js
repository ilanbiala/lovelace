angular.module('lovelace', [
	'ngMaterial',
	'ui.router',
]).config(['$locationProvider', '$mdThemingProvider', function($locationProvider, $mdThemingProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');

	$mdThemingProvider
		.theme('default')
		.primaryPalette('blue')
		.accentPalette('green');
}]);
