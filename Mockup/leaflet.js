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

var defaultIcon = L.icon({
	iconUrl: '/images/marker1.svg',
	iconSize: [50, 50],
	iconAnchor: [25, 50],
	popupAnchor: [0, -50],
});

var largeIcon = L.icon({
	iconUrl: '/images/marker3.svg',
	iconSize: [50, 50],
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

var featureGroups = L.featureGroup().addTo(map);
var markersInfo = [];



// Read markers data from data.csv
function getMarkerInfo() {
	return new Promise(function (resolve, reject) {
		var markersInfo = [];
		var activeMarker = null;
		$.get('/AQSs_Info/e.csv', function (csvString) {

			// Use PapaParse to convert string to array of objects
			var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data;

			// For each row in data, create a marker and add it to the map
			// For each row, columns `Latitude`, `Longitude`, and `Title` are required
			var sidebar = L.control.sidebar('sidebar', {
				autopan: true,
				position: 'right'
			}).addTo(map);

			for (let i = 0; i < data.length - 1; i++) {
				(function () { // Create a new scope for each iteration of the loop

					var row = data[i];
					if (row != null) {
						markersInfo.push(data[i].title);
					}
					var latlngs = [];
					// var marker = [];
					if (row.lat != null && row.lng != null) {
						latlngs = L.latLng([row.lat, row.lng]);
						var marker = L.marker(latlngs).addTo(featureGroups);
						marker.setIcon(defaultIcon).bindTooltip(data[i].title, { direction: 'top', offset: [1, -40] });
						// marker.on('mouseover', function () {
						// 	marker.setIcon(largeIcon);
						// });

						// marker.on('mouseout', function () {
						// 	marker.setIcon(defaultIcon);
						// });
						marker.on('click', function () {
							if (activeMarker != null) {
								activeMarker.setIcon(defaultIcon);
							}
							changeMarkerIcon(marker);
							activeMarker = marker;
							sidebar.setContent(generateMarkerContent(data[i].title, data[i].lat, data[i].lng)).show();
						});
					}
				}());
			}
			resolve(markersInfo);
			var bound = featureGroups.getBounds();
			map.fitBounds(featureGroups.getBounds(), {
				animate: false,
			});
		});
	})
};
var markerInfoPromise = getMarkerInfo();


function changeMarkerIcon(marker) {
	// Change the icon for the clicked marker
	marker.setIcon(L.icon({
		iconUrl: '/images/marker3.svg',
		iconSize: [50, 50],
		iconAnchor: [25, 50],
		popupAnchor: [0, -50],
	}));
}

// markerInfoPromise.then(function (markersInfo) {
// 	var marks = [
// 		L.marker([51.5, -0.09]),
// 		L.marker([51.5, -0.10]),
// 		L.marker([51.5, -0.11])
// 	];
// 	var mar = L.featureGroup(marks).addTo(map);
// 	var sidebar = L.control.sidebar('sidebar', {
// 		autopan: true,
// 		position: 'right'
// 	}).addTo(map);
// 	// console.log(markersInfo[2]);
// 	// featureGroups.eachLayer(function (marker) {
// 	for (let i = 0; i <= markersInfo.length; i++) {
// 		console.log(markersInfo[i]);
// 		featureGroups.on('click', function () {
// 			sidebar.setContent(markersInfo[i]);
// 			sidebar.show();
// 		});
// 	}
// });
// featureGroups.on('popupopen', function () {
// 	var ctx = document.getElementById('myChart').getContext('2d');
// 	var myChart = new Chart(ctx, {
// 		type: 'bar',
// 		data: chartData,
// 		options: chartOptions
// 	});
// });
// featureGroups.bindPopup('aa');

// console.log(markers);
// console.log(markers[0]);
// for (var i in markers) {
// 	var a = L.featureGroup(markers[i]).addTo(map);
// 	console.log(markers[i]);
// }
// var marks = [
// 	L.marker([51.5, -0.09]),
// 	L.marker([51.5, -0.10]),
// 	L.marker([51.5, -0.11])
// ];
// m1 = L.marker([-31.5, 160.11]).addTo(map);
// var sidebar = L.control.sidebar('sidebar', {
// 	position: 'right'
// }).addTo(map);

// marks.eachLayer(function (marker) {
// 	marker.on('click', function () {
// 		sidebar.setContent('a');
// 		sidebar.show();
// 	});
// });

// Create a new chart and attach it to the canvas element in the marker content
function createMarkerChart() {
	// Get a reference to the canvas element in the marker content
	const canvas = document.querySelector(`.marker-content .marker-chart`);

	// Create a new chart object and configure it with some data
	const chart = new Chart(canvas, {
		type: 'line',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
			datasets: [{
				label: 'Sales',
				data: [10, 20, 30, 40, 50, 60, 70],
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
	// Return the chart object so that we can update it later if needed
	return chart;
}



function generateMarkerContent(title, lat, lng) {
	const content = `
	  <div class="marker-content">
		<h3 class="marker-title">${title} Station</h3>
		<canvas id="marker-chart-${title}" class="marker-chart" width="200" height="200"></canvas>
		<p class="marker-latlng">Latitude: ${lat}, Longitude: ${lng}</p>
	  </div>
	`;

	setTimeout(() => {
		const canvas = document.getElementById(`marker-chart-${title}`);
		if (canvas) {
			const ctx = canvas.getContext('2d');
			getOzoneDataForLocation(title, '/AQSs_Info/forecast.csv').then((result) => {
				// console.log(result);
				var xValues = result.map((d) => d.date);
				// console.log('xValues:' + xValues);
				var yValues = result.map((d) => d.ozone);
				// console.log('yValues:' + yValues);
				new Chart(ctx, {
					type: 'line',
					data: {
						labels: xValues,
						datasets: [{
							label: 'Forecast',
							fill: false,
							lineTension: 0,
							backgroundColor: "rgba(0,0,255,1.0)",
							borderColor: "rgba(0,0,255,0.1)",
							data: yValues,
						}]
					},
					options: {
						legend: {
							display: true,
							labels: {
								fontSize: 12,
								fontColor: '#333',
							},
						},
						scales: {
							xAxes: [{
								scaleLabel: {
									display: true,
									labelString: 'Forecast time'
								}
							}],
							yAxes: [{
								ticks: { min: 0, max: 2.5 },
								scaleLabel: {
									display: true,
									labelString: 'Ozone (ppb)'
								}
							}],
						}
					}
				});
			});
		}
	}, 0);
	return content;
}
// getOzoneDataForLocation('Liverpool', '/AQSs_Info/forecast.csv');
// cam = getOzoneDataForLocation('Camden', '/AQSs_Info/forecast.csv');
// console.log('cam ' + cam);
async function getOzoneDataForLocation(location, csvFilePath) {
	const response = await fetch(csvFilePath);
	const file = await response.text();
	const parsedData = Papa.parse(file, { header: true }).data;

	const locationHeader = `OZONE_${location.toUpperCase()}`;
	const data = parsedData.map((row) => parseFloat(row[locationHeader]));
	const forecastHours = parsedData.map((row) => parseFloat(row['forecast_hours']));
	const date = parsedData.map((row) => new Date(row['datetime']).toLocaleString());
	forecastData = [];
	for (let i = 0; i < data.length; i++) {
		if (!isNaN(forecastHours[i]) && forecastHours[i] > 0) {
			forecastData.push({ date: date[i], ozone: data[i] });
		}
	}
	return forecastData;
}

// Wait for the Promise to resolve before accessing markerinfo
// var markerInfoPromise = getMarkerInfo();
// markerInfoPromise.then(function (markersInfo) {
// 	// Create a new Leaflet Sidebar instance
// 	// var sidebar = L.control.sidebar({
// 	// 	autopan: true,       // whether to center the map on the sidebar
// 	// 	closeButton: true,   // whether to show a close button in the sidebar
// 	// 	container: 'sidebar', // the ID of the sidebar container
// 	//   }).addTo(map);
// 	var sidebar = L.control.sidebar('sidebar', {
// 		autopan: true,
// 		position: 'right',
// 		closeButton: true,
// 	});

// 	map.addControl(sidebar);
// 	console.log(markersInfo);
// 	// Iterate over the markerinfo array and create a marker for each item
// 	// for (var i = 0; i < markersInfo.length; i++) {
// 	// var item = markersInfo[i];

// 	// // Create a new Leaflet marker for the item
// 	// var marker = L.marker([item.lat, item.lng]).addTo(map);

// 	// Bind a click event to the marker
// 	// featureGroups.on('click', function (e) {
// 	// 	// Update the content of the sidebar with the description
// 	// 	sidebar.setContent(markersInfo[i]);
// 	// 	// Show the sidebar
// 	// 	sidebar.show();
// 	featureGroups.on('click', function () {
// 		// var marker = event.layer;
// 		sidebar.setContent('3');
// 	});


// 	// Do something with the updated markerinfo variable
// });

// featureGroups.on('click', function () {
// 	sidebar.setContent('abc').show();
// });


// map.addControl(sidebar);


// // .on('click', function(){
// // sidebar.setContent('Null Island').show();
// // });


// var marker2 = L.marker([40,40]).addTo(map).on('click', function(){
// sidebar.setContent('Somewhere else').show();
// });

// // console.log(markers[1]);
// marks.forEach(function (marks) {
// 	marks.addTo(map);
// });

// console.log(bound);

// featureGroups.addLayer(markers);

// create feature group
// add markers to map



// create feature group with markers
// groupBounds = new L.featureGroup(featureGroups);

// // fitBounds of feature group to map
// map.fitBounds(groupBounds.getBounds(), {
// 	padding: [30, 30],
// });

// // add event listener to markers to open sidebar
// groupBounds.on("click", function (e) {
// 	if (e.layer instanceof L.Marker) {
// 		showSidebarWidthText(e.layer.options["marker-options-id"]);
// 	}
// });

// // add comment to sidebar depending on marker id
// function showSidebarWidthText(id) {
// 	data.filter((marker) => {
// 		if (marker.id === id) {
// 			document.body.classList.add("active-sidebar");
// 			addContentToSidebar(marker);
// 		}
// 	});
// }




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

var nswBoundary = L.geoJSON(nswMapData, {
	style: function (geoJsonFeature) {
		return {
			color: 'blue',
			opacity: 0.5,
			fillOpacity: 0
		}
	}
}).addTo(map);

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




// config map
// let config = {
// 	minZoom: 7,
// 	maxZoom: 18,
// };
// // magnification with which the map will start
// const zoom = 18;
// // co-ordinates

// const lat = 52.22977;
// const lng = 21.01178;

// // calling map
// const map = L.map("mapid", config).setView([lat, lng], zoom);

// // Used to load and display tile layers on the map
// // Most tile servers require attribution, which you can set under `Layer`
// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
// 	attribution:
// 		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// // ------------------------------------------------------------
// // async function to get data from json
// async function fetchData(url) {
// 	try {
// 		const response = await fetch(url);
// 		const data = await response.json();
// 		return data;
// 	} catch (err) {
// 		console.error(err);
// 	}
// }

// // --------------------------------------------------
// // button to close sidebar

// const buttonClose = document.querySelector(".close-button");

// let featureGroups = [];
// let groupBounds;
// let latlngs = [];

// // function to add markers to map
// fetchData("./places.json")
// 	.then((data) => {
// 		// create markers width "marker-options-id"
// 		data.map((marker) => {
// 			featureGroups.push(
// 				L.marker(marker.coords, {
// 					icon: L.divIcon({
// 						className: "leaflet-marker-icon",
// 						html: `${marker.id}`,
// 						iconSize: L.point(30, 30),
// 						popupAnchor: [3, -5],
// 					}),
// 					"marker-options-id": marker.id,
// 				})
// 			);
// 			latlngs.push(marker.coords);
// 		});

// 		// add polyline to map
// 		L.polyline(latlngs, {
// 			color: "#ff3939",
// 			weight: 2,
// 		}).addTo(map);

// 		return data;
// 	})
// 	.then((data) => {
// 		// create feature group
// 		// add markers to map
// 		featureGroups.map((marker) => {
// 			marker.addTo(map);
// 		});

// 		// create feature group with markers
// 		groupBounds = new L.featureGroup(featureGroups);

// 		// fitBounds of feature group to map
// 		map.fitBounds(groupBounds.getBounds(), {
// 			padding: [50, 50],
// 		});

// 		// add event listener to markers to open sidebar
// 		groupBounds.on("click", function (e) {
// 			if (e.layer instanceof L.Marker) {
// 				showSidebarWidthText(e.layer.options["marker-options-id"]);
// 			}
// 		});

// 		// add comment to sidebar depending on marker id
// 		function showSidebarWidthText(id) {
// 			data.filter((marker) => {
// 				if (marker.id === id) {
// 					document.body.classList.add("active-sidebar");
// 					addContentToSidebar(marker);
// 				}
// 			});
// 		}
// 	});

// // --------------------------------------------------
// // close when click esc
// document.addEventListener("keydown", function (event) {
// 	// close sidebar when press esc
// 	if (event.key === "Escape") {
// 		closeSidebar();
// 	}
// });

// // close sidebar when click on close button
// buttonClose.addEventListener("click", () => {

// 	// document.getElementsById('sidebar').style.display = 'none';
// 	// close sidebar when click on close button
// 	closeSidebar();
// });

// // close sidebar when click outside
// document.addEventListener("click", (e) => {
//   const target = e.target;
//   if (
//     !target.closest(".sidebar") &&
//     !target.classList.contains("leaflet-marker-icon")
//   ) {
//     closeSidebar();
//   }
// });


// // document.querySelector('.close-button').addEventListener('click', function() {
// //     document.getElementsByClassName('active-sidebar').style.display = 'none';
// // });

// // --------------------------------------------------
// // close sidebar

// function closeSidebar() {
// 	// remove class active-sidebar
// 	// document.body.classList.remove("active-sidebar");
// 	// document.body.classList.remove(".sidebar");
// 	const element = document.querySelector(".sidebar");
// 	element.style.display = 'none';
// 	// document.getElementsByClassName('sidebar').style.display = 'none';

// 	// bounds map to default
// 	boundsMap();
// }

// // --------------------------------------------------
// // add content to sidebar

function addContentToSidebar(marker) {
	const { id, title, small, description, img, coords } = marker;
	const smallInfo = small !== undefined ? `<small>${small}</small>` : "";

	// create sidebar content
	const sidebarTemplate = `
	  <article class="sidebar-content">
		<h1>${title}</h1>
		<div class="marker-id">${id}</div>
		<div class="info-content">
		  <img class="img-zoom" src="${img.src}" alt="${img.alt}">
		  ${smallInfo}
		  <div class="info-description">${description}</div>
		</div>
	  </article>
	`;

	const sidebar = document.querySelector(".sidebar");
	const sidebarContent = document.querySelector(".sidebar-content");

	// always remove content before adding new one
	sidebarContent?.remove();

	// add content to sidebar
	sidebar.insertAdjacentHTML("beforeend", sidebarTemplate);

	sidebar.style.display = 'block';

	// set bounds depending on marker coords
	boundsMap(coords);
}

// // --------------------------------------------------
// // bounds map when sidebar is open
function boundsMap(coords) {
	const sidebar = document.querySelector(".sidebar").offsetWidth;

	const marker = L.marker(coords);
	const group = L.featureGroup([marker]);

	// bounds depending on whether we have a marker or not
	const bounds = coords ? group.getBounds() : groupBounds.getBounds();

	// set bounds of map depending on sidebar
	// width and feature group bounds
	map.fitBounds(bounds, {
		paddingTopLeft: [coords ? sidebar : 0, 10],
	});
}

