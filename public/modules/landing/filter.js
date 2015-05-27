angular
	.module('lovelace')
	.filter('mailto', [function() {
		return function(string) {
			return encodeURIComponent(string);
		};
	}]);
