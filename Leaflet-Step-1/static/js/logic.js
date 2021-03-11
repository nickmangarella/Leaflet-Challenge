// Create a map object
var myMap = L.map("mapid", {
  center: [40.7, -94.5],
  zoom: 8
});
  
// Create the tile layer (background of the map)
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);
  
function markerSize(mag) {
  return mag / 40;
}

function markerColor(depth) {
}

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(url, function (data) {
    
  var earthquakes = data.features;

  for (var i = 0; i < earthquakes.length; i++) {

    var quakeMarker = L.circle([earthquakes.geometry[i].coordinates[0],earthquakes.geometry[i].coordinates[1]], {
      color: "black",
      fillColor: "green",
      radius: markerSize(earthquakes.properties[i].mag)
    }).bindPopup("")
  }
});