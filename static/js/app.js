// An array containing data to create markers
var url = "/api/v1.0/map_visulization"
// Function to determine marker size based on total_gross
function markerSize(total_gross) {
  return total_gross / 250;
}

d3.json(url, function(data){


// Define variables for our base layers
var streetmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiZGF2aWQ4ODAxMTAiLCJhIjoiY2poeG5zZXp4MGRveDN2bzN3ZnV4OWN1cyJ9.FeCJLUzK5_3wnNu7qupc1g." +
    "T6YbdDixkOBWH_k9GbS8JQ",{
  noWrap: false,
}
);
var darkmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiZGF2aWQ4ODAxMTAiLCJhIjoiY2poeG5zZXp4MGRveDN2bzN3ZnV4OWN1cyJ9.FeCJLUzK5_3wnNu7qupc1g." +
    "T6YbdDixkOBWH_k9GbS8JQ"
);

// Stop repeating the map
	data.forEach(function(row) {
		row["first_sales"] = +row["first_sales"]
		row["second_sales"] = +row["second_sales"]
		row["third_sales"] = +row["third_sales"]
		
		//Put latitude and longitude into coordinates
		row["coordinates"] = [row["latitude"], row["longitude"]]
	})
	console.log(data);

// Create a baseMaps object
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};


// Define arrays to hold created country markers
var countryMarkers_2012 = [];
var countryMarkers_2015 = [];
var countryMarkers_2018 = [];

// Loop through data and create country markers
for (var i = 0; i < data.length; i++) {
  // Setting the marker radius for the country by passing total_gross into the markerSize function
  
  countryMarkers_2012.push(
    L.circle(data[i].coordinates, {
      stroke: false,
      fillOpacity: 0.25,
      color: "black",
      fillColor: "red",
      radius: markerSize(data[i].first_sales)
    })
	
	.bindPopup("<h1>" + data[i].Country 
	+ "</h1> <hr> <li>2012 Sales: "
	+ "$" + data[i].first_sales.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "</li>" 
	+ "<li>2015 Sales: "
	+ "$" + data[i].second_sales.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "</li>"
	+ "<li>2018 Sales: "
	+ "$" + data[i].third_sales.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "</li>"
	)//.addTo(myMap)
	
)};

// Loop through data and create country markers
for (var i = 0; i < data.length; i++) {
  // Setting the marker radius for the country by passing total_gross into the markerSize function
  countryMarkers_2015.push(
    L.circle(data[i].coordinates, {
      stroke: false,
      fillOpacity: 0.25,
      color: "black",
      fillColor: "yellow",
      radius: markerSize(data[i].second_sales)
    }).bindPopup("<h1>" + data[i].Country 
	+ "</h1> <hr> <li>2012 Sales: "
	+ "$" + data[i].first_sales.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "</li>" 
	+ "<li>2015 Sales: "
	+ "$" + data[i].second_sales.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "</li>"
	+ "<li>2018 Sales: "
	+ "$" + data[i].third_sales.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "</li>"
	)//.addTo(myMap)
)};

// Loop through data and create country markers
for (var i = 0; i < data.length; i++) {
  // Setting the marker radius for the country by passing total_gross into the markerSize function
  countryMarkers_2018.push(
    L.circle(data[i].coordinates, {
      stroke: false,
      fillOpacity: 0.25,
      color: "black",
      fillColor: "blue",
      radius: markerSize(data[i].third_sales)
    }).bindPopup("<h1>" + data[i].Country 
	+ "</h1> <hr> <li>2012 Sales: "
	+ "$" + data[i].first_sales.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "</li>" 
	+ "<li>2015 Sales: "
	+ "$" + data[i].second_sales.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "</li>"
	+ "<li>2018 Sales: "
	+ "$" + data[i].third_sales.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "</li>"
	)//.addTo(myMap)
)};

// Create 3 separate layer groups: for country
var country_2012 = L.layerGroup(countryMarkers_2012);
var country_2015 = L.layerGroup(countryMarkers_2015);
var country_2018 = L.layerGroup(countryMarkers_2018);

// Pass our map layers into our layer control
// Add the layer control to the map

// Create an overlay object
var overlayMaps = {
  "Sales: The Avengers 2012": country_2012,
  "Sales: Avengers: Age of Ultron 2015": country_2015,
  "Sales: Avengers: Infinity War 2018": country_2018
};


// Define a map object
var myMap = L.map("map", {
  center: [40.00, -3.50],
  zoom: 2,
  layers: [streetmap, country_2012, country_2015, country_2018]
});

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
});