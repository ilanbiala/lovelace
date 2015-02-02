angular.module('lovelace.services', ['ngResource']).factory('Message', ['$resource', function($resource) {
	return $resource('/api/messages/:userId', {
		'userId': '@_id'
	}, {
		createMessage: {
			method: 'POST'
		},
		hasAccount: {
			url: '/api/users/hasAccount',
			method: 'POST'
		}
	});
}]);
