// Initial configuration of map
let config = {
  minZoom: 6,
  maxZoom: 12,
};
// Magnification with which the map will start
const zoom = 6;
// Coordinates of NSW geographic center
const cenLat = -33.163191;
const cenLng = 147.032179;

var map = L.map("mapid", config).setView([cenLat, cenLng], zoom); // ([coordinates], zoom scale)

var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 14,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' +
    " contributors",
}).addTo(map);

L.control.scale({ imperial: false }).addTo(map);

var StamenTerrain = L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}",
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: "abcd",
    minZoom: 0,
    maxZoom: 18,
    ext: "png",
  }
);

var StadiaAlidadeSmoothDark = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
);

var defaultIcon = L.icon({
  iconUrl: "/images/marker1.svg",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

// Home button
{
  // Home button
  const htmlTemplate = `<svg width="32" height="32" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="m5.183 5.436.268-.865c-.368.09-.626.569-.716.861h-.144c-.014-.2-.064-.706-.2-.84.324-.333.798-.408 1.412-.3l-.4 1.15-.22-.005ZM1.895 3.408l.065.516-.248-.109-.126-.725c.88-.14 2.716.795 2.782 2.339l-.892-.008c-.186-.813-.928-1.825-1.582-2.013Zm.251 2c-.134-.546-.499-1.163-.936-1.288l.076.424-.248-.104-.11-.556c.6-.096 1.905.554 2.076 1.533l-.858-.009ZM1.118 5.4c-.102-.3-.285-.572-.643-.644l.134.64-.233-.002-.218-.878c.572-.08 1.588.32 1.725.891L1.118 5.4Zm4.832.485-5.891.014-.011-.249 5.903-.087-.002.322Z" fill="#000"/>
    </svg>`;
  // '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 18.451L16 6.031 0 18.451v-5.064L16 .967l16 12.42zM28 18v12h-8v-8h-8v8H4V18l12-9z" /></svg>';
  // create custom button
  const customControl = L.Control.extend({
    // button position
    options: {
      position: "topleft",
    },

    // method
    onAdd: function (map) {
      // create button
      const btn = L.DomUtil.create("button");
      btn.title = "NSW";
      btn.innerHTML = htmlTemplate;
      btn.className += "leaflet-bar back-to-home hidden";

      return btn;
    },
  });

  // adding new button to map controll
  map.addControl(new customControl());

  // on drag end
  map.on("moveend", getCenterOfMap);

  const buttonBackToHome = document.querySelector(".back-to-home");

  function getCenterOfMap() {
    buttonBackToHome.classList.remove("hidden");

    buttonBackToHome.addEventListener("click", () => {
      map.flyTo([cenLat, cenLng], zoom);
    });

    map.on("moveend", () => {
      const { lat: latCenter, lng: lngCenter } = map.getCenter();

      const latC = latCenter.toFixed(3) * 1;
      const lngC = lngCenter.toFixed(3) * 1;

      const defaultCoordinate = [+cenLat.toFixed(3), +cenLng.toFixed(3)];

      const centerCoordinate = [latC, lngC];

      // if (compareToArrays(centerCoordinate, defaultCoordinate)) {
      //   buttonBackToHome.classList.add("hidden");
      // }
    });
  }

  // const compareToArrays = (a, b) => JSON.stringify(a) === JSON.stringify(b);
}


var featureGroups = L.featureGroup().addLayer(map);
var markersInfo = [];

var markerInfoPromise = getMarkerInfo();
// markerInfoPromise.then(function(markers) {
//   console.log(markersInfo);
// });

//! Potential overlapping problem can be improved (featureGroup and markerClusterGroup)
// Read markers data from data.csv
function getMarkerInfo() {
  return new Promise(function (resolve, reject) {
    // var markersInfo = [];
    var activeMarker = null;
    var markerClusterGroup = L.markerClusterGroup();
    $.get("/AQSs_Info/e.csv", function (csvString) {
      // Use PapaParse to convert string to array of objects
      var data = Papa.parse(csvString, {
        header: true,
        dynamicTyping: true,
      }).data;

      // Create a new panel for the new tab
      var newPanel = L.DomUtil.create("div", "sidebar-pane");
      newPanel.innerHTML = "<h1>New Tab Content</h1>";

      var sidebar = L.control
        .sidebar("sidebar", {
          autopan: true,
          position: "right",
        })
        .addTo(map);

      for (let i = 0; i < data.length - 1; i++) {
        (function () {
          // Create a new scope for each iteration of the loop
          var row = data[i];
          if (row != null) {
            markersInfo.push(data[i].title);
          }
          var latlngs = [];
          if (row.lat != null && row.lng != null) {
            latlngs = L.latLng([row.lat, row.lng]);
            let marker = L.marker(latlngs).addTo(featureGroups);
            marker.setIcon(defaultIcon).bindTooltip(data[i].title, {
              direction: "top",
              offset: [1, -40],
            });
            marker.on("click", function () {
              if (activeMarker != null) {
                activeMarker.setIcon(defaultIcon);
              }
              changeMarkerIcon(marker);
              activeMarker = marker;
              sidebar.setContent(
                  generateMarkerContent(data[i].title, data[i].lat, data[i].lng)
                ).show();
            });
            markerClusterGroup.addLayer(marker);
          }
        })();
      }
      map.addLayer(markerClusterGroup);
      
      resolve(markersInfo);
      var bound = featureGroups.getBounds();
      map.fitBounds(featureGroups.getBounds(), {
        animate: false,
      });
      // map.setView(L.latLng(cenLat, cenLng), 6);
    });
  });
}

async function changeMarkerIcon(marker) {
  // Change the icon for the clicked marker
  marker.setIcon(
    L.icon({
      iconUrl: "/images/marker3.svg",
      iconSize: [60, 60],
      iconAnchor: [30, 60],
      popupAnchor: [0, -60],
    })
  );
}

function generateMarkerContent(title, lat, lng) {
  const content = `
	  <div class="marker-content">
	  	<div class="marker-title-container">
			  <h2 class="marker-title">${title} Station</h2>
	  		<p class="marker-latlng"><b>Latitude:</b> ${lat} | <b>Longitude:</b> ${lng}</p>
		  </div>
      <div class="container">
        <div class="tabs">
          <h3 class="tab-item active">Forecast </h3>
          <h3 class="tab-item">History </h3>
        </div>
      </div> 

			<div class="tab-content">
        <div class="active">
          <canvas id="marker-chart-${title}" class="marker-chart" width="200" height="200"></canvas>
        </div>
        <div>
          <canvas id="NO2-chart-${title}" class="NO2-chart" width="200" height="200"></canvas>
          <canvas id="WDR-chart-${title}" class="WDR-chart" width="200" height="200"></canvas>
          <canvas id="WSP-chart-${title}" class="WSP-chart" width="200" height="200"></canvas>
        </div>
        
			</div>
      <div class="stats">
        <h4>Current value of O3: </h4>
        <h4>Max value of O3: </h4>
        <h4>Stats</h4>
        <h5>MAE: </h5>
      </div>
		</div>
	`;

  setTimeout(() => {
    const canvas1 = document.getElementById(`marker-chart-${title}`);
    const canvas2 = document.getElementById(`NO2-chart-${title}`);
    const canvas3 = document.getElementById(`WDR-chart-${title}`);
    const canvas4 = document.getElementById(`WSP-chart-${title}`);

    const ctx1 = canvas1.getContext("2d");
    const ctx2 = canvas2.getContext("2d");
    const ctx3 = canvas3.getContext("2d");
    const ctx4 = canvas4.getContext("2d");

    if (canvas1) {
      getOzoneDataForLocation(title, "/AQSs_Info/forecast.csv").then(
        (result) => {
          // extract data from forecastData
          const forecastXValues = result.forecastData.map((d) => d.date);
          const forecastYValues = result.forecastData.map((d) => d.ozone);

          // extract data from historyData
          const historyXValues = result.historyData.map((d) => d.date);
          const historyYValues = result.historyData.map((d) => d.ozone);
          console.log(forecastXValues.map((x, i) => ({x: x, y: forecastYValues[i]})))
          console.log(historyXValues.map((x, i) => ({x: x, y: historyYValues[i]})))
          // generate chart for both canvas elements
          generateChart(
            ctx1,
            forecastXValues,
            forecastYValues,
            historyXValues,
            historyYValues
          );
        }
      );
    }

    let tabs = document.querySelectorAll(".tabs h3");
    let tabContents = document.querySelectorAll(".tab-content div");
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        tabContents.forEach((content) => {
          content.classList.remove("active");
        });
        tabs.forEach((tab) => {
          tab.classList.remove("active");
        });
        // tabContents[index].classList.add('active');
        // tabs[index].classList.add('active');

        if (index === 0) {
          tabContents[index].classList.add("active");
          tabs[index].classList.add("active");
        } else {
          tabContents[index].classList.add("active");
          tabs[index].classList.add("active");
          getHistoryDataForLocation(
            title,
            "NO2",
            "/AQSs_Info/forecast.csv"
          ).then((result) => {
            // extract data from historyData
            const historyXValues = result.map((d) => d.date);
            console.log(historyXValues);
            const historyYValues = result.map((d) => d.NO2);
            console.log(historyYValues);

            // generate chart for both canvas elements
            generateChart1(ctx2, "NO2", historyXValues, historyYValues);
          });
          getHistoryDataForLocation(
            title,
            "WDR",
            "/AQSs_Info/forecast.csv"
          ).then((result) => {
            // extract data from historyData
            const historyXValues = result.map((d) => d.date);
            console.log(historyXValues);
            const historyYValues = result.map((d) => d.NO2);
            console.log(historyYValues);

            // generate chart for both canvas elements
            generateChart1(ctx3, "WDR", historyXValues, historyYValues);
          });
          getHistoryDataForLocation(
            title,
            "WSP",
            "/AQSs_Info/forecast.csv"
          ).then((result) => {
            // extract data from historyData
            const historyXValues = result.map((d) => d.date);
            console.log(historyXValues);
            const historyYValues = result.map((d) => d.NO2);
            console.log(historyYValues);

            // generate chart for both canvas elements
            generateChart1(ctx4, "WSP", historyXValues, historyYValues);
          });
        }
      });
    });
  }, 0);
  return content;
}

async function generateChart(
  context,
  forecastXValues,
  forecastYValues,
  historyXValues,
  historyYValues
) {
  new Chart(context, {
    type: "line",
    data: {
      labels: historyXValues.concat(forecastXValues),
      datasets: [
        {
          label: "History",
          fill: false,
          backgroundColor: "rgba(255,0,255,1.0)",
          borderColor: "rgba(255,0,255,0.1)",
          data: historyXValues.map((x, i) => ({x: x, y: historyYValues[i]})),
        },
        {
          label: "Forecast",
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: forecastXValues.map((x, i) => ({x: x, y: forecastYValues[i]})),
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: true,
        labels: {
          fontSize: 12,
          fontColor: "#333",
        },
      },
      scales: {
        x: 
          {
            scaleLabel: {
              display: true,
              labelString: "Forecast time",
            },
            ticks: {
              // autoSkip: true,
              // maxTicksLimit: 80,
              maxRotation: 90,
              // minRotation: 0,
            },
          },
        
        y: 
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: Math.max(...historyYValues, ...forecastYValues) * 1.1,
            },
            scaleLabel: {
              display: true,
              labelString: "Ozone (ppb)",
            },
          },
        
      },
    },
  });
}

async function generateChart1(
  context,
  parameter,
  historyXValues,
  historyYValues
) {
  new Chart(context, {
    type: "line",
    data: {
      labels: historyXValues, // historyXValues.concat(forecastXValues),
      datasets: [
        {
          label: "Forecast",
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(255,0,0,1.0)",
          borderColor: "rgba(255,0,0,0.5)",
          data: historyYValues,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: `${parameter} History Data`,
        fontSize: 15,
        fontColor: "#000000",
        fontStyle: "bold",
      },
      legend: {
        display: true,
        labels: {
          fontSize: 12,
          fontColor: "#333",
        },
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Forecast time",
            },
            ticks: {
              maxRotation: 90,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: Math.max(...historyYValues) * 1.1,
            },
            scaleLabel: {
              display: true,
              labelString: `${parameter} ()`,
            },
          },
        ],
      },
    },
  });
}

async function getOzoneDataForLocation(location, csvFilePath) {
  const response = await fetch(csvFilePath);
  const file = await response.text();
  const parsedData = Papa.parse(file, { header: true }).data;

  const locationHeader = `OZONE_${location.toUpperCase()}`;
  const data = parsedData.map((row) => parseFloat(row[locationHeader]));
  const forecastHours = parsedData.map((row) =>
    parseFloat(row["forecast_hours"])
  );
  const date = parsedData.map((row) =>
    new Date(row["datetime"]).toLocaleString(undefined, {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  forecastData = [];
  for (let i = 0; i < data.length; i++) {
    if (!isNaN(forecastHours[i]) && forecastHours[i] > 0) {
      forecastData.push({ date: date[i], ozone: data[i] });
    }
  }
  historyData = [];
  for (let i = 0; i < data.length; i++) {
    if (!isNaN(forecastHours[i]) && forecastHours[i] <= 0) {
      historyData.push({ date: date[i], ozone: data[i] });
    }
  }
  return { forecastData, historyData };
}

async function getHistoryDataForLocation(location, parameter, csvFilePath) {
  const response = await fetch(csvFilePath);
  const file = await response.text();
  const parsedData = Papa.parse(file, { header: true }).data;

  const locationHeader = `${parameter}_${location.toUpperCase()}`;
  const data = parsedData.map((row) => parseFloat(row[locationHeader]));
  const forecastHours = parsedData.map((row) =>
    parseFloat(row["forecast_hours"])
  );
  const date = parsedData.map((row) =>
    new Date(row["datetime"]).toLocaleString(undefined, {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const historyData = [];
  for (let i = 0; i < data.length; i++) {
    if (!isNaN(forecastHours[i]) && forecastHours[i] <= 0) {
      historyData.push({ date: date[i], NO2: data[i] });
    }
  }
  return historyData;
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
      color: "blue",
      opacity: 0.5,
      fillOpacity: 0,
    };
  },
}).addTo(map);

// var baseMaps = {
//   Default: osm,
//   "Ozone O3": StamenTerrain,
//   "PM2.5": StadiaAlidadeSmoothDark,
// };
// L.control.layers(baseMaps, null, { collapsed: false }).addTo(map);

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

  sidebar.style.display = "block";

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

