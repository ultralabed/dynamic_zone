var deletedZoneFromList = function(zoneList, zoneId) {
	var index = zoneList.findIndex(function(zone) {
		return zone.zoneId === zoneId;
	});
	return zoneList.splice(index, 1)[0];
}

var deletePolygon = function(zone) {
	console.log(zone);
	if(typeof zone === "undefined"){
	}
	else{
		zone.setMap();
	}
}

