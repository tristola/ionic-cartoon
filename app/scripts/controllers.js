'use strict';
angular.module('Sarjakuvat.controllers', [])

.controller('DashCtrl', function($scope,$filter) {
	
	var date=$filter('date')(new Date(), 'yyyyMMdd', null);
	$scope.iltalehtisrc='http://static.iltalehti.fi/sarjakuvat/Fingerpori_'+date+'.gif';
})

.controller('FriendsCtrl', function($http,$scope, Friends) {
  $http.get('http://m.hs.fi/fingerpori/').
  success(function(data, status, headers, config) {
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
   
  
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function() {
});
