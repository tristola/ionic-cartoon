'use strict';
angular.module('Sarjakuvat.controllers', [])

.controller('DashCtrl', function($scope,$filter) {
	
	var date=$filter('date')(new Date(), 'yyyyMMdd', null);
	$scope.iltalehtisrc='http://static.iltalehti.fi/sarjakuvat/Fingerpori_'+date+'.gif';
})

.controller('FriendsCtrl', function($http,$scope,$log, Friends) {
  $scope.hshtml='waiting';
  $http.get('http://m.hs.fi/fingerpori/').
  success(function(data, status, headers, config) {
  	var start=data.indexOf('<img alt="" src="http://hs13.snstatic.fi/webkuva/sarjis');
  	var end=data.indexOf('>',start);
  	$scope.hshtml = data.substring(start,end+1);
  }).
  error(function(data, status, headers, config) {
  	$log.log('getting failed');
  	$scope.hshtml='getting image failed';
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
   
  
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function() {
});
