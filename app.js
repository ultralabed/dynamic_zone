var map; // Global declaration of the map
// var iw = new google.maps.InfoWindow(); // Global declaration of the infowindow
var polygonArray = [];
var drawingManager;
var initialize = function() {
  var myLatlng = new google.maps.LatLng(40.9403762, -74.1318096);
  var myOptions = {
    zoom: 13,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP}
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}

var polygonInitialize = function(zone) {
  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.POLYGON]
    },
    polygonOptions: {
      editable: true,
      clickable: true,
      fillColor: "#00FF00"
    }
  });

  drawingManager.setMap(map);
  google.maps.event.addListener(drawingManager, "overlaycomplete", function(event) {
    var newShape = event.overlay;
    newShape.type = event.type;
  });

  google.maps.event.addListener(drawingManager, "overlaycomplete", function(event){
      // console.log("123");
      var polygon = event.overlay;
      polygon.zone = zone; //Add polygon with cutom zone id.
      // polygonClick(polygon);

      polygonArray.push(polygon);
      var vertices = "#" + zone + "_vertices";
      $(vertices).val(event.overlay.getPath().getArray());
      console.log(polygonArray);
      drawingManager.setMap(null);

      google.maps.event.addListener(polygon,"mouseover",function(){
       this.setOptions({fillColor: "#00FF00"});
      });
      google.maps.event.addListener(polygon,"mouseout",function(){
       this.setOptions({fillColor: "#FF0000"});
      });
      google.maps.event.addListener(polygon, 'click', function (){
        console.log(polygon.zone);
      });
  });
}



  jQuery(document).ready(function($) {
    var hightPolygon = function(selectedTrID) {
      console.log(selectedTrID);
      if (0 < polygonArray.length) {
        for (var i = 0; i < polygonArray.length; i++) {
          if(polygonArray[i].zone === selectedTrID){
            polygonArray[i].setOptions({fillColor: "#00FF00"});
          }
          else {
            polygonArray[i].setOptions({fillColor: "#FF0000"});
          }
        }
      }
    };

    $('#addZoneInZoneList').click(function() {
      var id = "ZONE_"+$("#zoneListTable tbody tr").length;
      var data = '<tr id='+id+'>'
                + '<td><input class="btn zoneDrawBtn" type="button" value="Draw '+id+'" id="'+id+'_draw_btn"/></td>'
                + '<td><input type="text" value="0" id="'+id+'_fee" required="true" /></td>'
                + '<td><input type="text" value="" id="'+id+'_vertices" required="true"/></td>'
                + '<td><input class="btn zoneDeleteBtn" type="button" value="DELETE" id="'+id+'_delete_btn"/></td>'
                +'</tr>';
      $('#zoneListTable > tbody:last-child').append(data);
    });

    $("#zoneListTable").delegate("tbody tr","click",function(){ //bind tr for changing bk color
      var selectedTr = $(this)[0];
      $("tr").css("background-color", "white");
      $(selectedTr).css("background-color", "#9DE693");
      hightPolygon(selectedTr.id);
    });

    $("#zoneListTable").delegate(".zoneDrawBtn", "click", function(e) {
        var zoneId = $(this).closest('tr').attr('id')
        polygonInitialize(zoneId);
    });

    $("#zoneListTable").delegate(".zoneDeleteBtn", "click", function(e) {
        var selectedTrID = $(this)[0].id;
        var zoneId = $(this).closest('tr').attr('id');
        var deletedZone = deletedZoneFromList(polygonArray, zoneId);
        deletePolygon(deletedZone);
        $('#'+zoneId).remove();

    });

    $('#save').click(function(){
        //iterate polygon zone1_vertices?
    });

    $('#zone1_delete').click(function(){

    });

    $('#zone2_delete').click(function(){
      var zoneId = 'zone2';
      var deletedZone = deletedZoneFromList(polygonArray, zoneId);
      deletePolygon(deletedZone);
      $('#zone2').attr("disabled", false);
      $('#zone2_fee').val(null);
      $('#zone2_vertices').val(null);
    });

    $('#zone2').click(function(){
        polygonInitialize('zone2');
        $('#zone1').attr("disabled", false);
        $('#zone2').attr("disabled", true);
    });

    $(".clickable-row").click(function() {
      $(".clickable-row").css("background-color", "white"); //make all background color white.
      $(this).css("background-color", "#9DE693"); //make toggle background color green
      if (0 < polygonArray.length) {
        for (var i = 0; i < polygonArray.length; i++) {
          if(polygonArray[i].zone === $(this).data("href")){
            polygonArray[i].setOptions({fillColor: "#00FF00"});
          }
          else {
            polygonArray[i].setOptions({fillColor: "#FF0000"});
          }
        }
      }
    });
  });
