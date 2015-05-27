angular
	.module('lovelace')
	.controller('HomeController', ['$scope', '$http', function($scope, $http) {
		function onPositionUpdate(position) {
			console.log(position);
			$scope.location = position.coords.latitude + ' ' + position.coords.longitude;
		}

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(onPositionUpdate);
		} else {
			$scope.location = '40.33 -74.13';
		}

		$scope.submit = function() {
			$http
				.post('/search', {
					location: $scope.location,
					query: $scope.query
				})
				.success(function(data, status, headers, config) {
					if (data.status === 200) {
						$scope.answer = data.body.output[0].actions.say.text;

						if (/weather|temperature/i.test($scope.query)) {
							$scope.mainIdea = 'weather';
							$scope.image = data.body.output[0].actions.show.images[0];
							$scope.source = data.body.output[0].actions.source.url;
						} else if (/news/i.test($scope.query)) {
							$scope.mainIdea = 'news';
							$scope.news = data.body.output[0].actions.show;
						} else if (/translate/i.test($scope.query)) {
							$scope.mainIdea = 'translate';
							console.log($scope.mainIdea);
						} else if (/image|picture/i.test($scope.query)) {
							$scope.mainIdea = 'image';
							$scope.pictures = data.body.output[0].actions.show.images;
						} else {
							$scope.mainIdea = 'text';
							console.log($scope.mainIdea);

							var hasCitation = $scope.answer.indexOf(' (Answers.com)');
							if (hasCitation !== -1) {
								$scope.answer = $scope.answer.substring(0, hasCitation);
							}

							$scope.source = data.body.output[0].actions.source.url;
						}
					}
				})
				.error(function(data, status, headers, config) {
					$scope.mainIdea = 'text';
					$scope.answer = 'An error occurred, please try again or refresh the page.';
				});
		};
	}]);
