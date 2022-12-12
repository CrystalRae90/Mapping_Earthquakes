
// // Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// Accessing the airport GeoJSON URL
let torontoHoods  = "https://raw.githubusercontent.com/CrystalRae90/Mapping_Earthquakes/main/torontoNeighborhoods.json";

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_Key
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_Key
    
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7,-79.3],
  zoom: 11,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Create a style for the lines.
let myStyle = {
  color: "blue",
  weight: 1,
  fillColor : "yellow"

}

// Grabbing our GeoJSON data.
d3.json(torontoHoods ).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style:myStyle,
    onEachFeature: function(feature,layer) {
      layer.bindPopup("<h3> Neighborhood:" + feature.properties.AREA_NAME + "</h3> <hr> <h4> Area Code:" + feature.properties.AREA_S_CD + "</h4>")
    }
  }).addTo(map)
});

// // Grabbing our GeoJSON data.
// d3.json(torontoHoods).then(function(data) {
//   console.log(data);
// // Creating a GeoJSON layer with the retrieved data.
// L.geoJSON(data, {
//   style : myStyle,
//   onEachFeature: function(features, layer){
//     layer.bindPopup("<h3> Airline: " + features.properties.AREA_NAME + "</h3> <hr> <h4>Destination: " + features.properties.AREA_S_CD + "</h4>")
//   }
// }).addTo(map)
// });