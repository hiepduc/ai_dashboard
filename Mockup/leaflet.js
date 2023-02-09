var map = L.map('mapid').setView([-33.8735670, 151.2068498], 10); // ([coordinates], zoom scale)

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' + ' contributors'
}).addTo(map);

var StamenTerrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
});

var StadiaAlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

coords = [[-33.88505, 151.04390], [-33.91977, 150.92550], [-33.7512, 150.6941], [-32.5421803, 151.2185641], [-33.8139, 151.0044]];
stationNames = ['Lidcombe', 'Liverpool', 'Penrith', 'Hunter Valley', 'Parramatta'];
ppb25 = [5, 10, 8, 12, 15];
ppb10 = [7, 9, 3, 20, 10];

let l = coords.length;

var defaultIcon = L.icon({
	iconUrl: '/images/marker2.svg',
	iconSize: [50, 50],
	// iconAnchor: [15, 46],
	popupAnchor: [0, -20]
});

var largeIcon = L.icon({
	iconUrl: '/images/marker1.svg',
	iconSize: [60, 60],
	// iconAnchor: [15, 46],
	popupAnchor: [0, -20]
});

// markerData = [];
// $.ajax({
// 	url: "/AQSs_Info/SiteDetails.txt",
// 	async: false,
// 	dataType: "text",
// 	success: function (data) {
// 		var lines = data.split("\n");
// 		for (var i = 0; i < lines.length; i++) {
// 			var fields = lines[i].split(",");
// 			var lat = parseFloat(fields[0]);
// 			var lng = parseFloat(fields[1]);
// 			markerData.push([lat, lng]);
// 		}
// 	}
// });

// for (let i = 0; i < l; i++) {
// 	var pop = L.popup({
// 		closeOnClick: true
// 	}).setContent('<h4>Station: ' + stationNames[i] + '<br>PM2.5: ' + ppb25[i] + '<br> PM10: ' + ppb10[i] + '</h4>');

// 	// var marker = L.marker(coords[i]).addTo(map).bindPopup(pop);

// 	(function (marker) {
// 		marker.on('mouseover', function () {
// 			marker.setIcon(largeIcon);
// 		});

// 		marker.on('mouseout', function () {
// 			marker.setIcon(defaultIcon);
// 		});
// 	})(L.marker(coords[i], { icon: defaultIcon }).addTo(map).bindPopup(pop));

// 	// marker.on('mouseover', function () {
// 	// 	marker.setIcon(largeIcon);
// 	// });

// 	// marker.on('mouseout', function () {
// 	// 	marker.setIcon(defaultIcon);
// 	// });

// 	// var tooltip = L.tooltip({
// 	// 	permanent: true
// 	// }).setContent(stationNames[i]);
// 	// marker.bindTooltip(tooltip);
// }

$.get('./AQSs_Info/data.csv', function(csvString) {

    // Use PapaParse to convert string to array of objects
    var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;

    // For each row in data, create a marker and add it to the map
    // For each row, columns `Latitude`, `Longitude`, and `Title` are required
    for (var i in data) {
      var row = data[i];

      var marker = L.marker([row.Latitude, row.Longitude], {
        opacity: 1
      }).addTo(map);
    }

  });

// for (var i = 0; i < markers.length; i++) {
// 	(function (marker) {
// 		marker.on('mouseover', function () {
// 		  marker.setIcon(largeIcon);
// 		});

// 		marker.on('mouseout', function () {
// 		  marker.setIcon(defaultIcon);
// 		});
// 	  })(L.marker(markers[i], {icon: defaultIcon}).addTo(map));
//   }



var baseMaps = {
	'Default': osm,
	'Ozone O3': StamenTerrain,
	'PM2.5': StadiaAlidadeSmoothDark
}
L.control.layers(baseMaps, null, { collapsed: false }).addTo(map);
// map.attributionControl.addAttribution('&copy; OpenStreetMap contributors');

// var markers = [
// 	[-33.88505, 151.04390],
// 	[-33.91977, 150.92550],
// 	[-33.7512, 150.6941]
//   ];

//   var defaultIcon = L.icon({
// 	iconUrl: '/images/nsw-logo.svg',
// 	iconSize: [25, 41],
// 	iconAnchor: [12, 41],
// 	popupAnchor: [1, -34]
//   });

//   var largeIcon = L.icon({
// 	iconUrl: '/images/nsw-logo.svg',
// 	iconSize: [50, 82],
// 	iconAnchor: [25, 82],
// 	popupAnchor: [1, -34]
//   });


