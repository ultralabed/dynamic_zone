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
      fillColor: "#FF0000"
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
      google.maps.event.addListener(polygon,"mouseover",function(){
       this.setOptions({fillColor: "#00FF00"});
      });

      google.maps.event.addListener(polygon,"mouseout",function(){
       this.setOptions({fillColor: "#FF0000"});
      });
      polygon.zone = zone; //Add polygon with cutom zone id.
      polygonClick(polygon);

      polygonArray.push(polygon);
      var vertices = "#" + zone + "_vertices";
      $(vertices).val(event.overlay.getPath().getArray());
      console.log(polygonArray);
      drawingManager.setMap(null);
  });

  var polygonClick = function(polygon) {
    google.maps.event.addListener(polygon, 'click', function (event) {
      console.log(polygon.zone);
    });
  }


  // google.maps.event.addListener(path, "set_at", function(){
  //     for (i in polygonArray) {
  //         if (polygonArray[i].getPath() == this) {
  //             alert('Got it'); //polygonArray[i]
  //         }
  //     }
  // });
}



  jQuery(document).ready(function($) {
    $('#save').click(function(){
        //iterate polygon zone1_vertices?
    });

    $('#zone1_delete').click(function(){
      // initialize();
      for (var i = 0; i < polygonArray.length; i++) {
        if(polygonArray[i].zone === 'zone1'){
          polygonArray[i].setMap(null);
          if (i > -1) {
            polygonArray.splice(i, 1);
          }
        }
      }
      $('#zone1').attr("disabled", false);
      $('#zone1_fee').val(null);
      $('#zone1_vertices').val(null);
    });

    $('#zone1').click(function(){
        polygonInitialize('zone1');
        $('#zone1').attr("disabled", true);
        $('#zone2').attr("disabled", false);
    });

    $('#zone2_delete').click(function(){
      // initialize();
      for (var i = 0; i < polygonArray.length; i++) {
        if(polygonArray[i].zone === 'zone2'){
          polygonArray[i].setMap(null);
          if (i > -1) {
            polygonArray.splice(i, 1);
          }
        }
      }
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
        $(this).css("background-color", "#9DE693"); //make toggle background color yellow
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
