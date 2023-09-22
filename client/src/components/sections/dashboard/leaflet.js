import generateMarkerContentPA from "../../Map/sidebarPurpleAir.js";
import generateChart from "../../Map/generateChart.js";
import purpleairSensors from "../../../AQSs_Info/sensors.js";
import getCategoryLabel from "../../Right_hand_side/extractCategory.js";
import getPollutantDataForLocation from "../../Inputs/retrieveData.js";
import * as sites from "../../../AQSs_Info/SiteDetails.js";
import { airPollutants } from "../../../Configuration/pollutant.js";
import * as icon from "../../../assets/images/svgGenerator.js";
import * as L from "leaflet";
import { LatLng, LatLngBounds, map } from "leaflet";
import "leaflet-sidebar";

// import nswMapData from "../../AQSs_Info/nswMap.js";
// console.log(Map);
// function a() {
  // Initial configuration of map
  // const southWest = new LatLng(-37.50528021, 130.9992792),
  //   northEast = new LatLng(-28.15701999, 163.638889),
  //   bounds = new LatLngBounds(southWest, northEast);

  // let config = {
  //   minZoom: 5,
  //   maxZoom: 19,
  //   maxBounds: bounds,
  //   maxBoundsViscosity: 0.9,
  // };
  // var w = window.innerWidth;
  // console.log("w");
  // console.log(w);
  // Magnification with which the map will start
  // var zoom;
  // if (w < 740) {
  //   zoom = 5;
  // } else zoom = 6;
  // let zoom = 6;
  // console.log(zoom);
  // Coordinates of NSW geographic center
  // const cenLat = -33.0;
  // const cenLng = 147.032179;

  // let container = L.DomUtil.get("mapid");
  // if (container != null) {
  //   container._leaflet_id = null;
  //   console.log("a");
  // }
  // console.log("h");
  // map = L.map("mapid", config).setView([cenLat, cenLng], zoom); // ([coordinates], zoom scale)
  // console.log("g");
  // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //   maxZoom: 19,
  //   attribution:
  //     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' +
  //     " contributors",
  // }).addTo(map);

  // L.control.scale({ imperial: false }).addTo(map);

  // L.geoJSON(nswMapData, {
  //   style: function (geoJsonFeature) {
  //     return {
  //       color: "blue",
  //       opacity: 0.8,
  //       fillOpacity: 0,
  //       weight: 3,
  //     };
  //   },
  // }).addTo(map);
  // console.log("f");
// }
// export default a;
// Home button
{
  // Home button
  const htmlTemplate = `<svg width="32" height="32" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="m5.183 5.436.268-.865c-.368.09-.626.569-.716.861h-.144c-.014-.2-.064-.706-.2-.84.324-.333.798-.408 1.412-.3l-.4 1.15-.22-.005ZM1.895 3.408l.065.516-.248-.109-.126-.725c.88-.14 2.716.795 2.782 2.339l-.892-.008c-.186-.813-.928-1.825-1.582-2.013Zm.251 2c-.134-.546-.499-1.163-.936-1.288l.076.424-.248-.104-.11-.556c.6-.096 1.905.554 2.076 1.533l-.858-.009ZM1.118 5.4c-.102-.3-.285-.572-.643-.644l.134.64-.233-.002-.218-.878c.572-.08 1.588.32 1.725.891L1.118 5.4Zm4.832.485-5.891.014-.011-.249 5.903-.087-.002.322Z" fill="#000"/>
    </svg>`;
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
      btn.title = "Zoom to NSW";
      btn.innerHTML = htmlTemplate;
      btn.className += "leaflet-bar back-to-home hidden";

      return btn;
    },
  });
  console.log('i');
  // adding new button to map controll
  map.addControl(new customControl());

  // on drag end
  map.on("moveend", getCenterOfMap);

  const buttonBackToHome = document.querySelector(".back-to-home");

  function getCenterOfMap() {
    buttonBackToHome.classList.remove("hidden");

    buttonBackToHome.addEventListener("click", () => {
      map.flyTo([cenLat, cenLng], zoom);
//     });
//   }
// }
// console.log("e");
// Create the div element
// const divSidebar = document.createElement("div");

// // Set the id attribute
// divSidebar.setAttribute("id", "sidebar");

// // Append the element to the desired parent element in the DOM
// const parentElement = document.getElementById("mapid"); // Assuming you have an element with id 'mapid' as the parent
// parentElement.appendChild(divSidebar);

// console.log("c");

// var sidebar = L.control
//   .sidebar("sidebar", {
//     autopan: true,
//     position: "right",
//   })
//   .addTo(map);

////////////////////////////////////////////////
// STATION MARKER
////////////////////////////////////////////////

// var activeStationMarker = null;
// let markerClusterGroup = L.markerClusterGroup({
//   iconCreateFunction: function (cluster) {
//     const childCount = cluster.getChildCount();
//     return L.divIcon({
//       html: `<img src='./assets/images/markerCluster.svg'>
//               <span>${childCount}</span>`,
//       className: "marker-cluster",
//     });
//   },
//   showCoverageOnHover: false,
// });
// console.log("d");
// function capitaliseCase(words) {
//   words = words.trim().toLowerCase().split(" ");
//   for (let i = 0; i < words.length; i++) {
//     words[i] = words[i][0].toUpperCase() + words[i].substr(1);
//   }
//   words = words.join(" ");
//   return words;
// }

// const regionFeatureGroups = {};
// const regionClusterGroup = L.markerClusterGroup({
//   iconCreateFunction: function (cluster) {
//     const childCount = cluster.getChildCount();
//     return L.divIcon({
//       html: `<img src='./assets/images/markerCluster.svg'>
//               <span>${childCount}</span>`,
//       className: "marker-cluster",
//     });
//   },
//   showCoverageOnHover: false,
//   maxClusterRadius: 70,
// });
// console.log(sites.regionDetails);
// Create a feature group to store all the regions in one layer and add it to map
// sites.regionDetails.forEach((region) => {
//   regionFeatureGroups[region.name] = L.featureGroup();
// });
// console.log(regionFeatureGroups);
// Generate markers for stations

// sites.regionDetails.forEach((region) => {
//   regionFeatureGroups[region.name] = L.featureGroup();
//   region.stations.forEach((station) => {
//     // console.log(station);
//     let latLngs = L.latLng([station.Latitude, station.Longitude]);
//     let marker = L.marker(latLngs, {
//       icon: colorMarker("station", "normal"),
//     }).bindTooltip(capitaliseCase(station.SiteName), { direction: "top" });
//     marker.on("click", () => {
//       if (activeSensorMarker != null) {
//         activeSensorMarker.setIcon(colorMarker("purpleair", "normal"));
//         activeSensorMarker = null;
//       }
//       if (activeStationMarker != null) {
//         activeStationMarker.setIcon(colorMarker("station", "normal"));
//       }
//       activeStationMarker = marker;
//       marker.setIcon(colorMarker("station", "selected"));
//       sidebar.setContent(generateMarkerContent(station)).show();
//     });
//     const closeButton = document.querySelector(".close");
//     closeButton.addEventListener("click", () => {
//       closeButtonAction(activeStationMarker, "station");
//     });

//     regionFeatureGroups[region.name].addLayer(marker);
//   });
// });
// for (const region in regionFeatureGroups) {
//   const featureGroup = regionFeatureGroups[region];
//   regionClusterGroup.addLayer(featureGroup);
// }
// regionClusterGroup.addTo(map);

// function colorMarker(type, state) {
//   let size;
//   if (state === "selected") {
//     size = 20;
//   } else if (state === "normal") {
//     size = 15;
//   }
//   const markerIcon = icon.marker(type, size);

//   const colorIcon = L.divIcon({
//     className: "marker",
//     html: markerIcon,
//     iconSize: [size, size],
//     iconAnchor: [size / 2, size],
//     // popupAnchor: [0, -size],
//     tooltipAnchor: [1, -size],
//   });
//   return colorIcon;
// }

// function generateMarkerContent(station) {
//   const title = capitaliseCase(station.SiteName);
//   const content = `
// 	  <div class="marker-content">

// 	  	<div class="marker-title-container">
// 			  <h2 class="marker-title">${title} Station</h2>
// 	  		<p class="marker-latlng"><b>Latitude:</b> ${station.Latitude} | <b>Longitude:</b> ${station.Longitude}</p>
//         <div class="marker-title__tabs">
//           <h3 class="tab-item active">Forecast</h3>
//           <h3 class="tab-item">Relevant historical data</h3>
//         </div>
//       </div>

// 			<div class="tab-content">
//         <div class="chart active">
//           <canvas id="marker-chart-${title}" class="marker-chart" width="1" height="1"></canvas>

//         </div>
//         <div class="chart">
//           <canvas id="NO2-chart-${title}" class="NO2-chart" width="200" height="200"></canvas>
//           <canvas id="WDR-chart-${title}" class="WDR-chart" width="200" height="200"></canvas>
//           <canvas id="WSP-chart-${title}" class="WSP-chart" width="200" height="200"></canvas>
//         </div>
//       </div>
// 		</div>
// 	`;

//   setTimeout(() => {
//     const canvas1 = document.getElementById(`marker-chart-${title}`);
//     const canvas2 = document.getElementById(`NO2-chart-${title}`);
//     const canvas3 = document.getElementById(`WDR-chart-${title}`);
//     const canvas4 = document.getElementById(`WSP-chart-${title}`);

//     const ctx1 = canvas1.getContext("2d");
//     const ctx2 = canvas2.getContext("2d");
//     const ctx3 = canvas3.getContext("2d");
//     const ctx4 = canvas4.getContext("2d");

//     if (canvas1) {
//       var timeSelection = document.querySelector("#select-time");
//       // console.log(timeSelection);
//       let selectedTime = timeSelection.value;
//       // console.log(selectedTime);

//       var pollutantSelection = document.querySelector("#select-pollutant");
//       // console.log(pollutantSelection);
//       let selectedPollutant = pollutantSelection.value;
//       // console.log(selectedPollutant);

//       var selectedPollutantObj = airPollutants.find(
//         (pollutant) => pollutant.value === selectedPollutant
//       );

//       /////////////////////////////////////////////////////
//       // Load forecast files
//       /////////////////////////////////////////////////////
//       getPollutantDataForLocation(station, selectedPollutantObj, "both").then(
//         (result) => {
//           // console.log(result);
//           // extract data from forecastData
//           const forecastXValues = result.forecastData.map((d) => d.date);
//           const forecastYValues = result.forecastData.map((d) => d.value);
//           // console.log("Forecast Y:");
//           // console.log(forecastYValues);
//           // console.log("X:");
//           // console.log(forecastXValues);
//           // extract data from historyData
//           const historyXValues = result.historyData.map((d) => d.date);
//           const historyYValues = result.historyData.map((d) => d.value);
//           // console.log("History Y:");
//           // console.log(historyYValues);
//           // console.log("X:");
//           // console.log(historyXValues);
//           // console.log(forecastXValues.map((x, i) => ({ x: x, y: forecastYValues[i] })));
//           // console.log(historyXValues.map((x, i) => ({ x: x, y: historyYValues[i] })));

//           const stationColorIndex = document.querySelector(
//             ".marker-title-container"
//           );
//           const stationCategory = getCategoryLabel(
//             selectedPollutantObj,
//             forecastYValues[0]
//           );
//           stationColorIndex.classList.add(stationCategory);

//           // generate chart for both canvas elements
//           generateChart(
//             ctx1,
//             selectedPollutantObj,
//             historyYValues,
//             forecastYValues,
//             historyXValues,
//             forecastXValues
//           );
//         }
//       );
//     }

//     let tabs = document.querySelectorAll(".marker-title__tabs h3");
//     let tabContents = document.querySelectorAll(".chart");
//     tabs.forEach((tab, index) => {
//       tab.addEventListener("click", () => {
//         tabContents.forEach((content) => {
//           content.classList.remove("active");
//         });
//         tabs.forEach((tab) => {
//           tab.classList.remove("active");
//         });
//         // tabContents[index].classList.add('active');
//         // tabs[index].classList.add('active');

//         if (index === 0) {
//           tabContents[index].classList.add("active");
//           tabs[index].classList.add("active");
//         } else {
//           tabContents[index].classList.add("active");
//           tabs[index].classList.add("active");
//           getPollutantDataForLocation(
//             title,
//             "NO2",
//             "./AQSs_Info/forecast1.csv",
//             "history"
//           ).then((result) => {
//             // extract data from historyData
//             const historyXValues = result.map((d) => d.date);
//             // console.log(historyXValues);
//             const historyYValues = result.map((d) => d.value);
//             // console.log(historyYValues);

//             // generate chart for both canvas elements
//             generateChart(
//               ctx2,
//               airPollutants[2],
//               historyYValues,
//               historyXValues
//             );
//           });
//           getPollutantDataForLocation(
//             title,
//             "WDR",
//             "./AQSs_Info/forecast1.csv",
//             "history"
//           ).then((result) => {
//             // extract data from historyData
//             const historyXValues = result.map((d) => d.date);
//             console.log(historyXValues);
//             const historyYValues = result.map((d) => d.value);
//             console.log(historyYValues);

//             // generate chart for both canvas elements
//             generateChart(
//               ctx3,
//               airPollutants[3],
//               historyYValues,
//               historyXValues
//             );
//           });
//           getPollutantDataForLocation(
//             title,
//             "WSP",
//             "./AQSs_Info/forecast1.csv",
//             "history"
//           ).then((result) => {
//             // extract data from historyData
//             const historyXValues = result.map((d) => d.date);
//             console.log(historyXValues);
//             const historyYValues = result.map((d) => d.value);
//             console.log(historyYValues);

//             // generate chart for both canvas elements
//             generateChart(
//               ctx4,
//               airPollutants[4],
//               historyYValues,
//               historyXValues
//             );
//           });
//         }
//       });
//     });
//   }, 0);
//   return content;
// }

// var purpleairFeatureGroups = L.featureGroup();
// var purpleairMarkerClusterGroup = L.markerClusterGroup({
//   iconCreateFunction: function (cluster) {
//     const childCount = cluster.getChildCount();
//     return L.divIcon({
//       html: `<img src='./assets/images/markerPurpleAirCluster.svg'>
//                     <span>${childCount}</span>`,
//       className: "marker-cluster",
//     });
//   },
//   showCoverageOnHover: false,
// });
// var purpleairInfo;
// var activeSensorMarker = null;

// getPurpleAirInfo();

// function getPurpleAirInfo() {
//   return new Promise(function (resolve, reject) {
//     const purpleairSensorsData = purpleairSensors.data;

//     for (let i = 0; i < purpleairSensorsData.length; i++) {
//       const purpleairSensor = purpleairSensorsData[i];
//       const purpleairSensorID = purpleairSensor[0];
//       const purpleairSensorName = purpleairSensor[1];
//       const purpleairSensorLatitude = purpleairSensor[2];
//       const purpleairSensorLongitude = purpleairSensor[3];

//       var purpleairLatLng = L.latLng([
//         purpleairSensorLatitude,
//         purpleairSensorLongitude,
//       ]);
//       let purpleairMarker = L.marker(purpleairLatLng, {
//         icon: colorMarker("purpleair", "normal"),
//       }).bindTooltip(purpleairSensorName, {
//         direction: "top",
//       });
//       purpleairMarker.on("click", function () {
//         if (activeStationMarker != null) {
//           activeStationMarker.setIcon(colorMarker("station", "normal"));
//           activeStationMarker = null;
//         }
//         if (activeSensorMarker != null) {
//           activeSensorMarker.setIcon(colorMarker("purpleair", "normal"));
//         }
//         activeSensorMarker = purpleairMarker;
//         purpleairMarker.setIcon(colorMarker("purpleair", "selected"));

//         generateMarkerContentPA(
//           purpleairSensorID,
//           purpleairSensorName,
//           purpleairSensorLatitude,
//           purpleairSensorLongitude
//         )
//           .then((content) => {
//             sidebar.setContent(content).show();
//           })
//           .catch((error) => {
//             console.error(error);
//             // Handle the error if needed
//           });
//       });

//       purpleairFeatureGroups.addLayer(purpleairMarker);
//       purpleairMarkerClusterGroup.addLayer(purpleairMarker);
//     }

//     map.addLayer(purpleairMarkerClusterGroup);
//     const closeButton = document.querySelector(".close");
//     closeButton.addEventListener("click", () => {
//       closeButtonAction(activeSensorMarker, "purpleair");
//     });
//     resolve(purpleairInfo);
//   });
// }

function closeButtonAction(activeMarker, markerType) {
  if (activeMarker != null) {
    if (markerType === "station") {
      activeMarker.setIcon(colorMarker(markerType, "normal"));
    } else if (markerType === "purpleair") {
      activeMarker.setIcon(colorMarker(markerType, "normal"));
    }
    activeMarker = null;
  }
  const slider = document.querySelector(".slider");
  slider.value = 0;
}

function toggleLayerVisibility(cluster) {
  if (map.hasLayer(cluster)) {
    map.removeLayer(cluster);
  } else {
    map.addLayer(cluster);
  }
}

const buttonContainer = document.getElementById("button-container");
buttonContainer.addEventListener("click", (event) => {
  const clickedButton = event.target;

  if (clickedButton.classList.contains("layer-button")) {
    clickedButton.classList.toggle("layer-button__active");
    clickedButton.classList.toggle("layer-button__disable");

    const buttonId = clickedButton.id;
    if (buttonId === "toggle-button__sensor") {
      toggleLayerVisibility(purpleairMarkerClusterGroup);
    } else if (buttonId === "toggle-button__station") {
      toggleLayerVisibility(markerClusterGroup);
    }
  }
});

///////////////////////////////////////////////
// ZOOM TO REGION
///////////////////////////////////////////////
// const selectButton = document.querySelector(".select-button");
// selectButton.addEventListener("click", () => {
//   const selectedRegion = document.querySelector("#select-region").value;
//   if (selectedRegion === "NSW") {
//     map.flyTo([cenLat, cenLng], zoom);
//     sites.regionDetails.forEach((region) => {
//       // If map has layers of other regions, make them disapper
//       if (map.hasLayer(regionFeatureGroups[region.name])) {
//         toggleLayerVisibility(regionFeatureGroups[region.name]);
//         console.log("Appear:" + region.name);
//       }
//     });
//     // If map doen't have NSW cluster, make it appears
//     if (!map.hasLayer(regionClusterGroup))
//       toggleLayerVisibility(regionClusterGroup);
//   } else {
//     sites.regionDetails.forEach((region) => {
//       if (region.name === selectedRegion) {
//         // Zoom to boundary of selected region
//         var northEastRegionBound = L.latLng(
//             region.largestLatitude,
//             region.largestLongitude
//           ),
//           southWestRegionBound = L.latLng(
//             region.smallestLatitude,
//             region.smallestLongitude
//           ),
//           regionBounds = L.latLngBounds(
//             northEastRegionBound,
//             southWestRegionBound
//           );
//         map.flyToBounds(regionBounds);

//         // Toggle the visibility of selected region
//         // If map has the NSw cluster layer, make it disapper
//         if (map.hasLayer(regionClusterGroup))
//           toggleLayerVisibility(regionClusterGroup);
//         // If map doesn't have the selected region, make it appears
//         if (!map.hasLayer(regionFeatureGroups[region.name])) {
//           toggleLayerVisibility(regionFeatureGroups[region.name]);
//           console.log("Appear:" + region.name);
//         } else regionFeatureGroups[region.name].addTo(map);
//       } else {
//         // If map has other regions, make them disappear
//         if (map.hasLayer(regionFeatureGroups[region.name])) {
//           toggleLayerVisibility(regionFeatureGroups[region.name]);
//           console.log("Disappear:" + region.name);
//         }
//       }
//     });
//   }
// });

// var nswBoundary = L.geoJSON(nswMapData, {
//   style: function (geoJsonFeature) {
//     return {
//       color: "blue",
//       opacity: 0.8,
//       fillOpacity: 0,
//       weight: 3,
//     };
//   },
// }).addTo(map);

// const dropdown = document.getElementById("select-region");
// const regionAbbreviations = {
//   SW: "Sydney South West",
//   NW: "Sydney North West",
//   CE: "Sydney East",
//   IL: "Illawarra",
//   UH: "Upper Hunter",
//   LH: "Lower Hunter",
//   // Add more region abbreviations and names as needed
// };

// function updateRegionOptions() {
//   // Clear existing options
//   dropdown.innerHTML = "";

//   // Fetch CSV files from Data folder
//   fetch("/data/")
//     .then((response) => response.text())
//     .then((html) => {
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(html, "text/html");

//       // Extract the file names
//       const fileElements = doc.querySelectorAll('a[href^="/data/"]');
//       const fileNames = Array.from(fileElements).map((element) => {
//         const href = element.getAttribute("href");
//         const fileName = href.substring(href.lastIndexOf("/") + 1);
//         return fileName;
//       });

//       console.log(fileNames);
//       // Assuming you have the array of file names as `fileNames`
//       const regionOptions = fileNames.map((fileName) => {
//         // Extract the region abbreviation from the file name
//         const regionAbbreviation = fileName.split("_")[0];

//         // Get the corresponding region name from the regionAbbreviations object
//         const regionName = regionAbbreviations[regionAbbreviation];

//         const matchingRegion = sites.regionDetails.find(
//           (region) => region.label === regionAbbreviation
//         );

//         if (matchingRegion) {
//           const regionName = matchingRegion.name;
//           const regionLabel = regionAbbreviations[regionAbbreviation];
//           console.log(regionName); // "Sydney North-west"
//           console.log(regionLabel); // "North West"
//           return `<option value="${regionName}">${regionName}</option>`;
//         } else {
//           console.log("Region not found");
//         }

//         // const regionOptions = sites.regionDetails.map((region) => {
//         //   console.log(region);
//         //   const regionName = regionAbbreviations[region.label];
//         //   return `<option value="${region.name}">${regionName}</option>`;
//         // });
//       });

//       // Update the dropdown list with the region options
//       dropdown.innerHTML = regionOptions.join("");
//     })
//     .catch((error) => {
//       console.error("Error fetching CSV files:", error);
//     });
// }

// // Call the function to update region options on page load or when needed
// updateRegionOptions();

// fetch("https://data.airquality.nsw.gov.au/api/Data/get_SiteDetails")
//   .then((response) => response.json())
//   .then((data) => {
//     // Handle the response data here
//     console.log(data);
//   })
//   .catch((error) => {
//     // Handle any errors that occurred during the request
//     console.error("Error:", error);
//   });

// var baseMaps = {
//   Default: osm,
//   "Ozone O3": StamenTerrain,
//   "PM2.5": StadiaAlidadeSmoothDark,
// };
// L.control.layers(baseMaps, null, { collapsed: false }).addTo(map);

// const sensorsID = {
//   sensor1: {
//     id: 180263,
//   },
//   sensor2: {
//     id: 180261,
//   },
//   sensor3: {
//     id: 180259,
//   },
//   sensor4: {
//     id: 180257,
//   },
// };

// Write key: F3A7FF2E-DDAD-11ED-BD21-42010A800008

// POST https://api.purpleair.com/v1/groups HTTP/1.1
// X-API-Key: F3A7FF2E-DDAD-11ED-BD21-42010A800008
// Content-Type: application/json

// {
//     "name": "ColocatedSensors"
// }

