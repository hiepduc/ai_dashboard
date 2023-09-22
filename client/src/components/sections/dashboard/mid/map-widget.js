import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

import { airPollutants } from "../../../../Configuration/pollutant";
import { regionDetails } from "../../../../utils/Map/SiteDetails";
import purpleairSensors from "../../../../utils/Map/sensors";

import { generateMarkerContent } from "../../../../utils/Map/sidebarAQS";
import generateMarkerContentPA from "../../../../utils/Map/sidebarPurpleAir";
import getCategoryLabel from "../../../../utils/helper/getCategoryLabel";

import { markerGenerator, svgHome } from "../../../../utils/Map/svgGenerator";
import markerCluster from "../../../../assets/images/markerCluster.svg";
import markerPurpleAirCluster from "../../../../assets/images/markerPurpleAirCluster.svg";
import { replaceSpace } from "../../../../utils/string/stringProcess";

import "leaflet-sidebar";
import "leaflet.markercluster";

export class MapWidget {
  constructor(domNode) {
    this.containerRef = domNode;
    const southWest = new L.LatLng(-37.50528021, 130.9992792),
      northEast = new L.LatLng(-28.15701999, 163.638889),
      bounds = new L.LatLngBounds(southWest, northEast);
    let config = {
      minZoom: 5,
      maxZoom: 19,
      maxBounds: bounds,
      maxBoundsViscosity: 0.9,
    };
    this.map = L.map(domNode, config, {
      zoomControl: true,
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: true,
      scrollWheelZoom: true,
      zoomAnimation: true,
      touchZoom: true,
      zoomSnap: 0.1,
    });
    let zoom = 6;
    // console.log(zoom);
    // Coordinates of NSW geographic center
    const cenLat = -33.0;
    const cenLng = 147.032179;
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' +
        " contributors",
    }).addTo(this.map);
    this.map.setView([cenLat, cenLng], zoom);
    L.control.scale({ imperial: false }).addTo(this.map);

    this.regionFeatureGroups = {};
    this.activeStationMarker = null;
    this.activeSensorMarker = null;

    // Create the div element
    const divSidebar = document.createElement("div");

    // Set the id attribute
    divSidebar.setAttribute("id", "sidebar");

    // Append the element to the desired parent element in the DOM
    const parentElement = document.getElementById("mapid"); // Assuming you have an element with id 'mapid' as the parent
    parentElement.appendChild(divSidebar);

    this.sidebar = L.control
      .sidebar("sidebar", {
        autopan: true,
        position: "right",
      })
      .addTo(this.map);

    this.regionClusterGroup = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        const childCount = cluster.getChildCount();
        return L.divIcon({
          html: `<img src=${markerCluster}>
                  <span>${childCount}</span>`,
          className: "marker-cluster",
        });
      },
      showCoverageOnHover: false,
      maxClusterRadius: 70,
    });

    // this.purpleairFeatureGroups = L.featureGroup();
    this.purpleairMarkerClusterGroup = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        const childCount = cluster.getChildCount();
        return L.divIcon({
          html: `<img src=${markerPurpleAirCluster}>
                    <span>${childCount}</span>`,
          className: "marker-cluster",
        });
      },
      showCoverageOnHover: false,
    });

    this.csvData = null;
    this.selection = null;

    this.homeButton(cenLat, cenLng, zoom);
    this.markerAQS();
    this.markerPA(this.sidebar);
    // this.initEventListeners();
  }

  getData(data) {
    this.csvData = data;
    console.log(this.csvData);
    if (this.csvData) {
      // Assuming you have a new color for the markers
      var selectedPollutantObj = airPollutants.find(
        (pollutant) => pollutant.label === this.selection.pollutants
      );

      this.regionFeatureGroups[this.selection.regions].eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          // Check if it's a marker
          const stationId = layer.options.stationId.toUpperCase(); // Get the station identifier
          console.log("stationId: ", stationId);
          // Use the stationId to access the data in this.csvData
          if (this.csvData.data.stations.hasOwnProperty(stationId)) {
            const forecastValue =
              this.csvData.data.stations[stationId].forecastValue[0];
            let color = getCategoryLabel(selectedPollutantObj, forecastValue);
            // Set the new icon for the marker
            layer.setIcon(colorMarker("station", "normal", color));
          } else {
            const forecastValue = 0;
            let color = getCategoryLabel(selectedPollutantObj, forecastValue);
            // Set the new icon for the marker
            layer.setIcon(colorMarker("station", "normal", "default"));
          }
        }
      });
    }
  }

  getSelection(selection) {
    this.selection = selection;
    console.log(selection);
  }

  homeButton(cenLat, cenLng, zoom) {
    // Home button
    const htmlTemplate = svgHome;
    // create custom button
    const customControl = L.Control.extend({
      // button position
      options: {
        position: "topleft",
      },
      // method
      onAdd: function () {
        // create button
        const btn = L.DomUtil.create("button");
        btn.title = "Zoom to NSW";
        btn.innerHTML = htmlTemplate;
        btn.className += "leaflet-bar back-to-home";
        return btn;
      },
    });
    // adding new button to map controll
    this.map.addControl(new customControl());

    const buttonBackToHome = document.querySelector(".back-to-home");
    buttonBackToHome.addEventListener("click", () => {
      this.map.setView([cenLat, cenLng], zoom);
    });
  }

  getContainerRef() {
    return this.containerRef;
  }

  // initEventListeners() {
  //   // Listen for a custom event triggered by React
  //   document.addEventListener("mapZoomToRegion", (event) => {
  //     const regionName = event.detail.regionName;
  //     this.zoomToRegion(regionName);
  //   });
  // }

  ///////////////////////////////////////////////
  // ZOOM TO REGION
  ///////////////////////////////////////////////
  zoomToRegion(selectedRegion) {
    console.log("Region zoom test: ", selectedRegion);
    // const selectButton = document.querySelector(".select-button");
    // selectButton.addEventListener("click", () => {
    // const selectedRegion = document.querySelector("#select-region").value;
    // if (selectedRegion === "NSW") {
    //   this.map.flyTo([this.cenLat, this.cenLng], this.zoom);
    //   regionDetails.forEach((region) => {
    //     // If map has layers of other regions, make them disapper
    //     if (this.map.hasLayer(this.regionFeatureGroups[region.label])) {
    //       this.toggleLayerVisibility(this.regionFeatureGroups[region.label]);
    //       console.log("Appear:" + region.label);
    //     }
    //   });
    //   // If map doen't have NSW cluster, make it appears
    //   if (!this.map.hasLayer(this.regionClusterGroup))
    //     this.toggleLayerVisibility(this.regionClusterGroup);
    // } else {
    console.log("Prepare to zoom");
    regionDetails.forEach((region) => {
      if (region.label === selectedRegion) {
        // Zoom to boundary of selected region
        var northEastRegionBound = L.latLng(
            region.largestLatitude,
            region.largestLongitude
          ),
          southWestRegionBound = L.latLng(
            region.smallestLatitude,
            region.smallestLongitude
          ),
          regionBounds = L.latLngBounds(
            northEastRegionBound,
            southWestRegionBound
          );
        this.map.flyToBounds(regionBounds);

        // Toggle the visibility of selected region
        // If map has the NSw cluster layer, make it disapper
        if (this.map.hasLayer(this.regionClusterGroup))
          this.toggleLayerVisibility(this.regionClusterGroup);
        // If map doesn't have the selected region, make it appears
        if (!this.map.hasLayer(this.regionFeatureGroups[region.label])) {
          this.toggleLayerVisibility(this.regionFeatureGroups[region.label]);
          console.log("Appear:" + region.label);
        } else this.regionFeatureGroups[region.label].addTo(this.map);
      } else {
        // If map has other regions, make them disappear
        if (this.map.hasLayer(this.regionFeatureGroups[region.label])) {
          this.toggleLayerVisibility(this.regionFeatureGroups[region.label]);
          console.log("Disappear:" + region.label);
        }
      }
    });
    // }
    // });
  }

  toggleLayerVisibility(cluster) {
    if (this.map.hasLayer(cluster)) {
      this.map.removeLayer(cluster);
    } else {
      this.map.addLayer(cluster);
    }
  }

  toggleStationClusterVisibility() {
    console.log("Now toggling button: station");
    this.toggleLayerVisibility(this.regionClusterGroup);
  }

  toggleSensorClusterVisibility() {
    console.log("Now toggling button: sensor");

    this.toggleLayerVisibility(this.purpleairMarkerClusterGroup);
  }

  markerAQS() {
    let color = "default";
    regionDetails.forEach((region) => {
      this.regionFeatureGroups[region.label] = L.featureGroup();
      region.stations.forEach((station) => {
        // console.log(station);
        let latLngs = L.latLng([station.Latitude, station.Longitude]);
        
        let marker = L.marker(latLngs, {
          icon: colorMarker("station", "normal", color),
          riseOnHover: true,
          stationId: replaceSpace(station.SiteName), // Assign a unique identifier
        }).bindTooltip(station.SiteName, { direction: "top",className: "leaflet-tooltip-fontsize" });

        marker.on("click", () => {
          if (this.csvData) {
            var pollutantSelection =
              document.querySelector("#select-pollutants");
            // console.log(pollutantSelection);
            let selectedPollutant = pollutantSelection.value;
            console.log(selectedPollutant);

            var selectedPollutantObj = airPollutants.find(
              (pollutant) => pollutant.label === this.selection.pollutants
            );
            const forecastYValues =
              this.csvData.data.stations[
                replaceSpace(station.SiteName.toUpperCase())
              ].forecastValue;
            const sidebarHeaderIndicator = getCategoryLabel(
              selectedPollutantObj,
              forecastYValues[0]
            );
            if (this.activeSensorMarker != null) {
              this.activeSensorMarker.setIcon(
                colorMarker("purpleair", "normal")
              );
              this.activeSensorMarker = null;
            }
            if (this.activeStationMarker != null) {
              this.activeStationMarker.setIcon(
                colorMarker("station", "normal", "good")
              );
            }
            this.activeStationMarker = marker;
            marker.setIcon(colorMarker("station", "selected", "good"));
            this.sidebar
              .setContent(generateMarkerContent(station, this.csvData))
              .show();
          }
        });

        // const closeButton = document.querySelector(".close");
        // closeButton.addEventListener("click", () => {
        //   closeButtonAction(this.activeStationMarker, "station");
        // });

        this.regionFeatureGroups[region.label].addLayer(marker);
      });
    });
    for (const region in this.regionFeatureGroups) {
      const featureGroup = this.regionFeatureGroups[region];
      this.regionClusterGroup.addLayer(featureGroup);
    }
    this.regionClusterGroup.addTo(this.map);
  }

  markerPA(sidebar) {
    // return new Promise(function (resolve, reject) {
    // var purpleairInfo;
    // var activeSensorMarker = null;
    const purpleairSensorsData = purpleairSensors.data;

    purpleairSensorsData.forEach((purpleairSensor) => {
      // const purpleairSensor = purpleairSensorsData[i];
      const purpleairSensorID = purpleairSensor[0];
      const purpleairSensorName = purpleairSensor[1];
      const purpleairSensorLatitude = purpleairSensor[2];
      const purpleairSensorLongitude = purpleairSensor[3];

      var purpleairLatLng = L.latLng([
        purpleairSensorLatitude,
        purpleairSensorLongitude,
      ]);
      let purpleairMarker = L.marker(purpleairLatLng, {
        icon: colorMarker("purpleair", "normal"),
      }).bindTooltip(purpleairSensorName, {
        direction: "top",
      });
      purpleairMarker.on("click", function () {
        if (this.activeStationMarker != null) {
          this.activeStationMarker.setIcon(colorMarker("station", "normal"));
          this.activeStationMarker = null;
        }
        if (this.activeSensorMarker != null) {
          this.activeSensorMarker.setIcon(colorMarker("purpleair", "normal"));
        }
        this.activeSensorMarker = purpleairMarker;
        purpleairMarker.setIcon(colorMarker("purpleair", "selected"));

        generateMarkerContentPA(
          purpleairSensorID,
          purpleairSensorName,
          purpleairSensorLatitude,
          purpleairSensorLongitude
        )
          .then((content) => {
            // console.log(content);
            sidebar.setContent(content).show();
          })
          .catch((error) => {
            console.error(error);
            // Handle the error if needed
          });
      });

      // this.purpleairFeatureGroups.addLayer(purpleairMarker);
      this.purpleairMarkerClusterGroup.addLayer(purpleairMarker);
    });

    // this.map.addLayer(this.purpleairMarkerClusterGroup);

    // const closeButton = document.querySelector(".close");
    // closeButton.addEventListener("click", () => {
    //   closeButtonAction(activeSensorMarker, "purpleair");
    // });
    // resolve(purpleairInfo);
    // });
  }
}

function colorMarker(type, state, color) {
  let size;
  if (state === "selected") {
    size = 20;
  } else if (state === "normal") {
    size = 15;
  }
  const markerIcon = markerGenerator(type, size, color);

  const colorIcon = L.divIcon({
    className: "marker",
    html: markerIcon,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    // popupAnchor: [0, -size],
    tooltipAnchor: [1, -size],
  });
  return colorIcon;
}

// function closeButtonAction(activeMarker, markerType) {
//   if (activeMarker != null) {
//     if (markerType === "station") {
//       activeMarker.setIcon(colorMarker(markerType, "normal"));
//     } else if (markerType === "purpleair") {
//       activeMarker.setIcon(colorMarker(markerType, "normal"));
//     }
//     activeMarker = null;
//   }
//   const slider = document.querySelector(".slider");
//   slider.value = 0;
// }
