# Leaflet-Challenge

## Description
Utilizing Leaflet, JavaScript, HTML, and CSS to map all global earthquakes that have occured over the last seven days. The map updates in real time as the dataset is from the USGS Earthquake API <https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson>. The foundation for the map is brought from the mapbox API <https://api.mapbox.com>

## Objectives

### Step 1 - logic.js:
Part 1
* Created the map object using Leaflet
* Created the tile layer using the mapbox API and calling my api key
* Created a function to set the circle's size to the magnitude return the magnitude times 10000 pixels for visibility on the map
* Created another function to set the cirlce colors to the depth return a specific color for each depth range
* Set up the legend placement on the map and tied the depth ranges to its grades using a for loop
```
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
  id: "mapbox/light-v9",
  accessToken: API_KEY
}).addTo(myMap);

// Create a function to set the cirlce size to the magnitude
function circleSize(mag) {
  return mag * 10000;
}

// Create a function to set the circle color to a depth range
function circleColor(depth) {
  return depth > 90 ? "#d73027" :
         depth > 70 ? "#fc8d59" :
         depth > 50 ? "#fee08b" :
         depth > 30 ? "#ffffbf" :
         depth > 10 ? "#d9ef8b" :
         depth > -10 ? "#91cf60" :
                      "#1a9850" ;
}

// Set up the Legend
var legend = L.control({position: "bottomright"});
legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "info legend"),
      grades = [-10, 10, 30, 50, 70, 90]

  // Loop through the depth intervals
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
        '<i style="background:' + circleColor(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
}
  return div;
};
legend.addTo(myMap);
```

Part 2
* Brought in the data by calling the USGS API using d3.json
* Set the features list of objects to a variable
* Used a for loop to run through each feature object and rendered each earthquake as a circle
* Called both the "cirlceColor" and "circleSize" fucntions to the fillColor and radius respectively
* Binded a pop-up to each circle for when a user clicks on a circle (earthquake) they have a description of the location and magnitude and depth measurements
```
// Read in the data from the API
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson", function(data) {
    
  var earthquakes = data.features;

  // For loop to cycle through each object (earthquake)
  for (var i = 0; i < earthquakes.length; i++) {

    // Render the earthquakes on the map as circles and call functions fillColor and radius
    L.circle([earthquakes[i].geometry.coordinates[1],earthquakes[i].geometry.coordinates[0]], {
      color: "black",
      fillColor: circleColor(earthquakes[i].geometry.coordinates[2]),
      fillOpacity: 0.8,
      radius: circleSize(earthquakes[i].properties.mag)
    }).bindPopup("<h3>" + earthquakes[i].properties.place + "</h3> <hr> <h4>Magnitude: " + earthquakes[i].properties.mag + "</h4> <h4>Depth: " + earthquakes[i].geometry.coordinates[2] + "</h4>").addTo(myMap);
  }
});
```