mocha.setup('bdd');
var expect = chai.expect;

describe('app', function() {
  it('delete_zone_from_list', function() {
    // expect(0).to.equal(0);
    var zoneId = 1;
    var zoneList = [{
    	zoneId: 1,
    	setMap: function() {

    	}
    }];
    deletedZoneFromList(zoneList, zoneId);
    expect(zoneList.length).to.equal(0);
  });

  it('delete_polygon_from_list', function() {
    // expect(0).to.equal(0);
    var zoneId = 1;
    var mapSet = false;
    var zoneList = [{
    	zoneId: 1,
    	setMap: function() {
    		mapSet = true;
    	}
    }];
    var deletedZone = deletedZoneFromList(zoneList, zoneId);
    deletePolygon(deletedZone);
    expect(mapSet).to.equal(true);
  });

  // it()
});


mocha.run();