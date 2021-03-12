// Create a map object
var myMap = L.map("map", {
  center: [39.419220, -111.950684],
  zoom: 5
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
  return mag * 10000;
}

function markerColor(depth) {
  return depth > 90 ? "#d73027" :
         depth > 70 ? "#fc8d59" :
         depth > 50 ? "#fee08b" :
         depth > 30 ? "#ffffbf" :
         depth > 10 ? "#d9ef8b" :
         depth > -10 ? "#91cf60" :
                      "#1a9850" ;
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson", function(data) {
    
  var earthquakes = data.features;

  for (var i = 0; i < earthquakes.length; i++) {

    L.circle([earthquakes[i].geometry.coordinates[1],earthquakes[i].geometry.coordinates[0]], {
      color: "black",
      fillColor: markerColor(earthquakes[i].geometry.coordinates[2]),
      fillOpacity: 0.8,
      radius: markerSize(earthquakes[i].properties.mag)
    }).bindPopup("<h3>" + earthquakes[i].properties.place + "</h3> <hr> <h4>Magnitude: " + earthquakes[i].properties.mag + "</h4> <h4>Depth: " + earthquakes[i].geometry.coordinates[2] + "</h4>").addTo(myMap);
  }
});