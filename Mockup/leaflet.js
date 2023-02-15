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

// let featureGroups = [];
// let groupBounds;

// Read markers data from data.csv
$.get('/AQSs_Info/d.csv', function (csvString) {

	// Use PapaParse to convert string to array of objects
	var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data;

	// For each row in data, create a marker and add it to the map
	// For each row, columns `Latitude`, `Longitude`, and `Title` are required
	for (var i in data) {
		var row = data[i];

		var marker = L.marker([row.Latitude, row.Longitude], {
			opacity: 1
		}).bindPopup(row.Title);

		marker.addTo(map);
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

var nswBoundary = L.geoJSON(nswMapData,	{style: function (geoJsonFeature) {
    return {color: 'blue',
			opacity: 0.5,
			fillOpacity: 0}
}}).addTo(map);

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

// function addContentToSidebar(marker) {
// 	const { id, title, small, description, img, coords } = marker;
// 	const smallInfo = small !== undefined ? `<small>${small}</small>` : "";

// 	// create sidebar content
// 	const sidebarTemplate = `
// 	  <article class="sidebar-content">
// 		<h1>${title}</h1>
// 		<div class="marker-id">${id}</div>
// 		<div class="info-content">
// 		  <img class="img-zoom" src="${img.src}" alt="${img.alt}">
// 		  ${smallInfo}
// 		  <div class="info-description">${description}</div>
// 		</div>
// 	  </article>
// 	`;

// 	const sidebar = document.querySelector(".sidebar");
// 	const sidebarContent = document.querySelector(".sidebar-content");

// 	// always remove content before adding new one
// 	sidebarContent?.remove();

// 	// add content to sidebar
// 	sidebar.insertAdjacentHTML("beforeend", sidebarTemplate);

// 	sidebar.style.display = 'block';

// 	// set bounds depending on marker coords
// 	boundsMap(coords);
// }

// // --------------------------------------------------
// // bounds map when sidebar is open
// function boundsMap(coords) {
// 	const sidebar = document.querySelector(".sidebar").offsetWidth;

// 	const marker = L.marker(coords);
// 	const group = L.featureGroup([marker]);

// 	// bounds depending on whether we have a marker or not
// 	const bounds = coords ? group.getBounds() : groupBounds.getBounds();

// 	// set bounds of map depending on sidebar
// 	// width and feature group bounds
// 	map.fitBounds(bounds, {
// 		paddingTopLeft: [coords ? sidebar : 0, 10],
// 	});
// }

