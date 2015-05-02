'use strict';
angular.module('Sarjakuvat.controllers', [])

.controller('DashCtrl', function($scope,$filter) {
	$scope.cartoondate=new Date();
	$scope.edellinen = function (){
		$scope.cartoondate.setDate($scope.cartoondate.getDate() - 1);
	}

	$scope.seuraava = function (){
		$scope.cartoondate.setDate($scope.cartoondate.getDate() + 1);
	}

})

.controller('FriendsCtrl', function($http,$scope,$timeout,$log,$ionicLoading, Friends) {
  var getSubHtml=function(strStart,strEnd,fullString,offset){
		var start=fullString.indexOf(strStart);
		var end=fullString.indexOf(strEnd,start);
		return fullString.substring(start,end+offset);
	}
	//for testing
	//var ROOT_URL='http://localhost:9000';
	var ROOT_URL='http://m.hs.fi';
  $scope.hshtml='LOADING';
	$scope.geturl='/fingerpori/';

	//http://m.hs.fi/fingerpori/s1305907022156
  //$scope.geturl='http://m.hs.fi/fingerpori/';
	$scope.update = function() {
		$ionicLoading.show({
			template: 'Loading...'
		});
		$scope.hshtml='waiting';
    $http.get(ROOT_URL+$scope.geturl).
    success(function(data, status, headers, config) {
		var edellinen=getSubHtml('<a class="prev-cm','</a>', data,0);
		var seuraava=getSubHtml('<a class="next-cm','</a>', data,0);
		$scope.edellinenurl=getSubHtml('/fingerpori','">', edellinen,0);
		$scope.seuraavaurl=getSubHtml('/fingerpori','">', seuraava,0);
    var comic=getSubHtml('<div id="full-comic">','<div id="send-article-dialog">',data,0);
		var img=getSubHtml('<div>','</div>',comic,0);
		var img=getSubHtml('<img','>',img,2)
    img=img.replace('<img','<img height="100%" width="100%"');
  	$scope.hshtml = img;
		$ionicLoading.hide();
  }).
  error(function(data, status, headers, config) {
  	$log.log('getting failed');
  	$scope.hshtml='getting image failed';
		$ionicLoading.hide();
		$timeout(function() {
			$scope.update();
		}, 3000);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
 };
	$scope.update();

	$scope.sarjakuvaUpdate= function(url){
		$log.log('url:'+url);
		$scope.geturl=url;
		$scope.update();
	}

})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function() {
});
