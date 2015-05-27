angular.module('lovelace')
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('home', {
					url: '/',
          controller: 'HomeController',
          templateUrl: '/modules/landing/partials/index.html'
				});

			$urlRouterProvider.otherwise('/');
		}
	]);
