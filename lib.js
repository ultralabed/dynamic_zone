var deletedZoneFromList = function(zoneList, zoneId) {
	// var index = zoneList.findIndex(function(zone) {
	// 	return zone.zoneId === zoneId;
	// });
	// return zoneList.splice(index, 1)[0];


	zoneList.forEach(function(zone, i) {
		if(zone.zoneId === zoneId){
      zoneList.splice(i, 1)[0];
	  }
	});
}

var deletePolygonFromList = function(zoneList, zoneId) {
	zoneList.forEach(function(zone, i) {
		if(zone.zoneId === zoneId){
      zone.setMap(null);
	  }
	});
}

