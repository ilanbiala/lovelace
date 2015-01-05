angular.module('lovelace.landing');

angular.module('lovelace', [
	'ngMaterial',
	'ui.router',
	'lovelace.landing',
]).config(['$locationProvider', '$mdThemingProvider', function($locationProvider, $mdThemingProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');
	
	$mdThemingProvider
		.theme('default')
		.primaryColor('blue')
		.accentColor('green');
}]);
