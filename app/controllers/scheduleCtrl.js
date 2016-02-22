angular.module("appModule")
.controller("scheduleCtrl", function ($scope, CrudService) {
	$scope.data = {};

	// $scope.data.scheduleList = [
	// 	{ "date": "20150101", 
	// 	"teamname": "siki", 
	// 	"tanto": "chen", 
	// 	"id": "14f3fa256fa3f8c9" }, 
	// 	{ "date": "20150102", 
	// 	"teamname": "fc-inage", 
	// 	"tanto": "li", 
	// 	"id": "419ffcbea5d82830" 
	// 	}
	// ];
	
	$scope.save = function(){
		CrudService.save($scope.data.newSchedule);	
		$scope.data.newSchedule = null;
	}
	
	$scope.delete = function(obj){
		CrudService.delete(obj);
		//$scope.data.scheduleList = CrudService.list();
		
	}
	
	$scope.edit = function(id){
		$scope.data.newSchedule = angular.copy(CrudService.get(id));
	}
	
	$scope.data.scheduleList = CrudService.list();
	
})
;