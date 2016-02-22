angular.module("crud", [])
.constant("resourceURL", "http://localhost:5600/schedule/")
.service("CrudService",function($resource, resourceURL){
	// config resource
	var res = $resource(resourceURL + ":id", {id : "@id"});
	
	// data list of scope
	var dataList =res.query();

	// insert or update
	this.save = function(obj){
		if(!obj) return;
		if(obj.id == null){
			// create
			(new res(obj)).$save().then(function(newObj){
				console.log("data saved" + newObj);
				dataList.push(newObj);
			});
		}else{
			// update
			obj.$save();
			for(i in dataList){
				if(dataList[i].id == obj.id){
					dataList[i] = obj;
				}
			}
		}
	}
	
	// search by id
	this.get = function(id){
		for( i in dataList ){
			if( dataList[i].id == id){
				return dataList[i];
			}
		}
	}
	
	// delete object 
	this.delete = function(obj){
		obj.$delete().then(function(){
			dataList.splice(dataList.indexOf(obj), 1);
		});
	}
	
	// list
	this.list = function(){
		return dataList;
	}
	
})
;