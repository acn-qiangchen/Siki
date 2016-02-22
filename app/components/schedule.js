angular.module("schedule",[])
.constant("resourceURL", "http://localhost:5600/schedule/")
.factory("scheduleSVC", function($resource, resourceURL){
	//console.log("scheduleSVC callde...");
	
	// config resource
	var res = $resource(resourceURL + ":id", {id : "@id"});
	
	return {
		list   : function(){
			return res.query();
		},

		create : function(obj){
			(new res(obj)).$save().then(function(){
				console.log("data saved : ");
				console.log(data);
			});
		},
		update : function(){},
		remove : function(){}
	};
});
