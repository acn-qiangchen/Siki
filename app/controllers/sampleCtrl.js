angular.module("sampleModule")
	.constant("profURL", "http://www.tink9.com/app/SIKI/datastore/memberProfiles.json")
	.constant("fireBaseURL", "https://amber-heat-7441.firebaseio.com")
	.constant("scheduleURL", "https://siki-schedule.firebaseio.com")
	.controller("sampleCtrl", function ($scope, $http, profURL) {
		$scope.data = {};
		// $scope.data.profiles = [{ "address": "Chiba City", "birthday": "19830524", "email": "shearertink@gmail.com", "name": "Shearer Chen", "officialName": "Qiang.Chen", "phoneNo": "0806662****", "position": "Mid Field", "sikiNo": 1, "id": "5cb851f91fc909ad" }, { "sikiNo": 2, "name": "Du yong", "email": "duyong@gmail.com", "officialName": "Yong.Du", "position": "Defender", "phoneNo": null, "address": null, "birthday": null, "face": null, "id": "f3b1f59c55b778be" }]
		
		$http.get(profURL, {})
			.success(function (data) {
				$scope.data.profiles = data;
			}).error(function (error) {
				console.log(error);
				$scope.error = error;
			});
	}).controller("fireBaseCtrl", function ($scope, $firebaseArray, fireBaseURL) {
		$scope.data = {};
		var ref = new Firebase(fireBaseURL);
		$scope.data.profiles = $firebaseArray(ref);

		$scope.save = function (profile) {
			$scope.data.profiles.$add(profile);
			$scope.data.newProfile = {};
			console.log("save successful.")
		}

		$scope.delete = function (profile) {
			$scope.data.profiles.$remove(profile);
		}
	}).controller("authCtrl", function ($scope, $firebaseAuth, $location, fireBaseURL) {
		var ref = new Firebase(fireBaseURL);
		$scope.authObj = $firebaseAuth(ref);

		$scope.authenticate = function (user, pass) {
			$scope.authObj.$authWithPassword({
				email: user,
				password: pass
			}).then(function (authData) {
				console.log("Logged in as:", authData.uid);
				$location.path("/member");
			}).catch(function (error) {
				console.error("Authentication failed:", error);
			});
		}
	}).controller("scheduleCtrl", function ($scope, $firebaseArray, scheduleURL) {
		$scope.data = {};
		var ref = new Firebase(scheduleURL);
		$scope.data.scheduleList = $firebaseArray(ref);

		$scope.save = function (obj) {
            if(obj.$id == null){
                $scope.data.scheduleList.$add(obj).then(function(ref){
                    console.log("added record with id:" + ref.key());
                });    
            }else{
                var idx = $scope.data.scheduleList.$indexFor(obj.$id);
                $scope.data.scheduleList[idx] = obj;
                $scope.data.scheduleList.$save(idx).then(function(ref){
                    console.log("saved record with id:" + ref.key());
                });
            }
			$scope.data.newSchedule = {};
		}

		$scope.edit = function (obj) {
			$scope.data.newSchedule = angular.copy(obj);
		}

		$scope.delete = function (obj) {
			$scope.data.scheduleList.$remove(obj).then(function(ref){
                console.log("deleted record with id:" + ref.key());
            });
		}
        
        // typehead
        $scope.data.members = [
            {"name":"xiaoli", "age":"10"},
            {"name":"xiaoli2", "age":"10"},
            {"name":"xiaoli3", "age":"10"},
            {"name":"chen", "age":"10"}
            
            ];
	})
;