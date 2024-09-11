import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

import { regionDetails } from "../../../../utils/Map/SiteDetails";
import purpleairSensors from "../../../../utils/Map/sensors";

import { generateMarkerContent } from "../../../../utils/Map/sidebarAQS";
import generateMarkerContentPA from "../../../../utils/Map/sidebarPurpleAir";
import getCategoryLabel from "../../../../utils/helper/getCategoryLabel";
import { findAirPollutantByLabel } from "../../../../utils/helper/lookupHelper";

import {
  markerGenerator,
  svgClusterMarker,
  svgHome,
} from "../../../../utils/Map/svgGenerator";
import markerCluster from "../../../../assets/images/markerCluster.svg";
import markerPurpleAirCluster from "../../../../assets/images/markerPurpleAirCluster.svg";
import {
  replaceSpace,
  replaceSpaceWithHyphen,
} from "../../../../utils/string/stringProcess";

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
        return L.divIcon({
          // html: `<img src=${markerCluster}>
          //         <span>${childCount}</span>`,
          className: "marker-cluster",
        });
      },
      showCoverageOnHover: false,
      maxClusterRadius: 70,
    });

    // this.purpleairFeatureGroups = L.featureGroup();
    this.sensorClusterGroup = L.markerClusterGroup({
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

    this.visualizeMode = null;
    this.csvData = null;
    this.selection = null;
    this.selectionState = null;
    this.stationObsData = null;

    this.homeButton(cenLat, cenLng, zoom);
    this.markerAQS();
    this.markerPA(this.sidebar, this.visualizeMode);
    // this.markerPA = this.markerPA.bind(this);
    // this.markerPA();
    // this.initEventListeners();
  }

  getVisualizeMode(visualizeMode) {
    this.visualizeMode = visualizeMode;
    console.log("buckle mid widget: ", this.visualizeMode);
  }

  getStationObsData(stationObsInfo) {
    this.stationObsData = stationObsInfo;
    if (this.stationObsData.length) {
      Object.entries(this.regionFeatureGroups).forEach((region) => {
        console.log("region feature2: ", region);

        region[1].eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            const stationId = layer.options.stationId; // Get the station identifier
            console.log("stationId: ", stationId);
            const foundStationObs = this.stationObsData.find(
              (stationObs) => stationObs.Site_Id === stationId
            );
            console.log("foundStationObs", foundStationObs);
            if (foundStationObs) {
              let colorCategory = replaceSpaceWithHyphen(
                foundStationObs.AirQualityCategory.toLowerCase()
              );
              layer.options.stationStatus = colorCategory;
              layer.setIcon(colorMarker("station", "normal", colorCategory));
            } else {
              layer.setIcon(colorMarker("station", "normal", "default"));
              layer.options.stationStatus = "default";
            }
          }
        });
      });
      console.log(
        "QQQQQQ: ",
        this.regionClusterGroup.options.iconCreateFunction
      );
      console.log("Q2", this.regionClusterGroup.options);
      // this.map.removeLayer(this.regionClusterGroup);
      // this.regionClusterGroup.options.maxClusterRadius = 10;
      // Update the cluster's icon function with the new highest category
      this.regionClusterGroup.options.iconCreateFunction = (cluster) => {
        const childMarkers = cluster.getAllChildMarkers(); // Get all child markers
        let clusterColor = "default"; // Default color is "good"

        const colorOrder = [
          "default",
          "good",
          "fair",
          "poor",
          "very-poor",
          "extremely-poor",
        ];

        childMarkers.forEach((marker) => {
          console.log("Q3", marker);
          const childCategory = marker.options.stationStatus;
          const childColorIndex = colorOrder.indexOf(childCategory);
          const clusterColorIndex = colorOrder.indexOf(clusterColor);

          // Compare the current child category with the cluster color
          if (childColorIndex > clusterColorIndex) {
            clusterColor = childCategory;
          }
        });
        // const highestCategory = findHighestCategory(cluster);

        const clusterIcon = L.divIcon({
          html: `${svgClusterMarker(clusterColor)}
                <span class=${clusterColor}>${cluster.getChildCount()}</span>`,
          className: "marker-cluster",
          iconSize: [30, 30],
        });
        return clusterIcon;
      };
      // Add the updated regionClusterGroup back to the map
      for (const region in this.regionFeatureGroups) {
        const featureGroup = this.regionFeatureGroups[region];
        this.regionClusterGroup.addLayer(featureGroup);
      }
      this.map.addLayer(this.regionClusterGroup);

      console.log(
        "QQQQQQ1: ",
        this.regionClusterGroup.options.iconCreateFunction
      );
      console.log("Q3", this.regionClusterGroup.options);
    }
  }

  getStationForecastData(data) {
    this.csvData = data;
    console.log(this.csvData);
    if (this.csvData) {
      // Assuming you have a new color for the markers
      console.log("selection pollutant", this.selection.pollutants);
      var selectedPollutantObj = findAirPollutantByLabel(
        this.selection.pollutants
      );
      //  airPollutants.find(
      //   (pollutant) => pollutant.label === this.selection.pollutants
      // );

      this.regionFeatureGroups[this.selection.regions].eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          // Check if it's a marker
          const stationName = layer.options.stationName.toUpperCase(); // Get the station identifier
          console.log("stationName: ", stationName);

          // Use the stationId to access the data in this.csvData
          if (this.csvData.data.stations.hasOwnProperty(stationName)) {
            const forecastValue =
              this.csvData.data.stations[stationName].forecastValue[0];
            let color = getCategoryLabel(selectedPollutantObj, forecastValue);
            // Set the new icon for the marker
            layer.setIcon(colorMarker("station", "normal", color));
            layer.options.stationStatus = color;
          } else {
            // Set default icon for the marker
            layer.setIcon(colorMarker("station", "normal", "default"));
            layer.options.stationStatus = "default";
          }
          console.log("mod: ", layer.options);
        }
      });
    }
  }

  setAnimation(sliderValue) {
    if (sliderValue && this.csvData) {
      var selectedPollutantObj = findAirPollutantByLabel(
        this.selection.pollutants
      );

      this.regionFeatureGroups[this.selection.regions].eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          // Check if it's a marker
          const stationName = layer.options.stationName.toUpperCase(); // Get the station identifier
          console.log("stationName: ", stationName);

          // Use the stationId to access the data in this.csvData
          if (this.csvData.data.stations.hasOwnProperty(stationName)) {
            const forecastValue =
              this.csvData.data.stations[stationName].forecastValue[
                sliderValue
              ];
            let color = getCategoryLabel(selectedPollutantObj, forecastValue);
            // Set the new icon for the marker
            layer.setIcon(colorMarker("station", "normal", color));
            // layer.options.stationStatus = color;
          } else {
            // Set default icon for the marker
            layer.setIcon(colorMarker("station", "normal", "default"));
          }
          console.log("mod: ", layer.options);
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

  ///////////////////////////////////////////////
  // ZOOM TO REGION
  ///////////////////////////////////////////////
  zoomToRegion(selectedRegion, selectionState) {
    console.log("Region zoom test: ", selectedRegion);
    console.log("oom: ", this.regionClusterGroup);
    if (!selectedRegion && !selectionState) {
      // If no region is selected, zoom to the default region
      selectedRegion = "NSW";
      this.zoom(selectedRegion);
      regionDetails.forEach((region) => {
        if (this.map.hasLayer(this.regionFeatureGroups[region.label]))
          this.toggleLayerVisibility(
            this.regionFeatureGroups[region.label],
            false
          );
      });
      if (!this.map.hasLayer(this.regionClusterGroup))
        this.toggleLayerVisibility(this.regionClusterGroup, true);
    } else if (selectedRegion) {
      this.zoom(selectedRegion);
      console.log("Zoom to region: ", selectedRegion);
      if (this.map.hasLayer(this.regionClusterGroup))
        this.toggleLayerVisibility(this.regionClusterGroup, false);
      regionDetails.forEach((region) => {
        if (region.label === selectedRegion) {
          this.toggleLayerVisibility(
            this.regionFeatureGroups[region.label],
            true
          );
          console.log("Appear:" + region.label);
        } else {
          if (this.map.hasLayer(this.regionFeatureGroups[region.label]))
            this.toggleLayerVisibility(
              this.regionFeatureGroups[region.label],
              false
            );
        }
      });
    }
  }

  zoom(regionLabel) {
    // Find the selected region and zoom to it
    const selectedRegionData = regionDetails.find(
      (region) => region.label === regionLabel
    );
    const {
      largestLatitude,
      largestLongitude,
      smallestLatitude,
      smallestLongitude,
    } = selectedRegionData;

    const northEastRegionBound = L.latLng(largestLatitude, largestLongitude);
    const southWestRegionBound = L.latLng(smallestLatitude, smallestLongitude);
    const regionBounds = L.latLngBounds(
      northEastRegionBound,
      southWestRegionBound
    );

    this.map.flyToBounds(regionBounds);
  }

  toggleStationClusterVisibility(isStationsVisible) {
    console.log("Now toggling button: station");
    if (!this.selection.regions)
      this.toggleLayerVisibility(this.regionClusterGroup, isStationsVisible);
    else
      this.toggleLayerVisibility(
        this.regionFeatureGroups[this.selection.regions],
        isStationsVisible
      );
  }

  toggleSensorClusterVisibility(isSensorsVisible) {
    console.log("Now toggling button: sensor");
    console.log("isSensorVisible: ", isSensorsVisible);
    this.toggleLayerVisibility(this.sensorClusterGroup, isSensorsVisible);
  }

  toggleLayerVisibility(layer, isVisible) {
    console.log(`Now toggling button: ${layer}`);
    console.log(`${layer} visibility: `, isVisible);

    if (isVisible) {
      this.map.addLayer(layer);
    } else {
      this.map.removeLayer(layer);
    }
  }

  markerAQS() {
    let color = "default";
    print("Buckle: ", color);

    regionDetails.forEach((region) => {
      this.regionFeatureGroups[region.label] = L.featureGroup();
      region.stations.forEach((station) => {
        // console.log(station);
        let latLngs = L.latLng([station.Latitude, station.Longitude]);
        print("Buckle: ", color);

        let marker = L.marker(latLngs, {
          icon: colorMarker("station", "normal", color),
          riseOnHover: true,
          stationName: replaceSpace(station.SiteName), // Assign a unique identifier
          stationId: station.Site_Id,
          stationStatus: "default",
        }).bindTooltip(station.SiteName, {
          direction: "top",
          className: "leaflet-tooltip-fontsize",
        });

        marker.on("click", () => {
          console.log("STATION STATUS buckle: ", marker.options.stationStatus);
          console.log("Buckle: ", color);
          console.log("Buckle aqms: ", this.visualizeMode);

          if (this.csvData && marker.options.stationStatus !== "default") {
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
              .setContent(
                generateMarkerContent(
                  station,
                  this.csvData,
                  this.selection.pollutants,
                  "station"
                )
              )
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
    // for (const region in this.regionFeatureGroups) {
    //   const featureGroup = this.regionFeatureGroups[region];
    //   this.regionClusterGroup.addLayer(featureGroup);
    // }
    // this.regionClusterGroup.addTo(this.map);
    console.log("oom2: ", this.regionClusterGroup);
  }

  //   markerPA(sidebar) {
  //     // return new Promise(function (resolve, reject) {
  //     // var purpleairInfo;
  //     // var activeSensorMarker = null;
  //     const purpleairSensorsData = purpleairSensors.data;
  //     print("Buckle: ", purpleairSensorsData);
  //     print("Buckle: ", purpleairSensorsData);

  //     purpleairSensorsData.forEach((purpleairSensor) => {
  //       v
  //       print("Buckle: ", sensor);
  //       var purpleairLatLng = L.latLng([sensor.Latitude, sensor.Longitude]);
  //       let purpleairMarker = L.marker(purpleairLatLng, {
  //         icon: colorMarker("purpleair", "normal"),
  //       }).bindTooltip("sensor.SiteName", {
  //         direction: "top",
  //       });
  //       purpleairMarker.on("click", function () {
  //         if (this.activeStationMarker != null) {
  //           this.activeStationMarker.setIcon(colorMarker("station", "normal"));
  //           this.activeStationMarker = null;
  //         }
  //         if (this.activeSensorMarker != null) {
  //           this.activeSensorMarker.setIcon(colorMarker("purpleair", "normal"));
  //         }
  //         this.activeSensorMarker = purpleairMarker;
  //         purpleairMarker.setIcon(colorMarker("purpleair", "selected"));

  //         // if (this.visualizeMode === "monitor") {
  //         //   generateMarkerContentPA(
  //         //     sensor.Site_Id,
  //         //     sensor.SiteName,
  //         //     sensor.Latitude,
  //         //     sensor.Longitude
  //         //   )
  //         //     .then((content) => {
  //         //       // console.log(content);
  //         //       sidebar.setContent(content).show();
  //         //     })
  //         //     .catch((error) => {
  //         //       console.error(error);
  //         //       // Handle the error if needed
  //         //     });
  //         // } else if (this.visualizeMode === "forecast" && this.csvData) {
  //         //   this.sidebar
  //         //     .setContent(
  //         //       generateMarkerContent(
  //         //         sensor,
  //         //         this.csvData,
  //         //         this.selection.pollutants,
  //         //         "sensor"
  //         //       )
  //         //     )
  //         //     .show();
  //         generateMarkerContent(
  //           sensor.Site_Id,
  //           sensor.SiteName,
  //           sensor.Latitude,
  //           sensor.Longitude,
  //           this.csvData,
  //           this.selection.pollutants,
  //           "purpleair"
  //         )
  //           .then((content) => {
  //             // console.log(content);
  //             sidebar.setContent(content).show();
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //             // Handle the error if needed
  //           });
  //         // }
  //       });
  //       // this.purpleairFeatureGroups.addLayer(purpleairMarker);
  //       this.sensorClusterGroup.addLayer(purpleairMarker);
  //     });

  //     // this.map.addLayer(this.sensorClusterGroup);

  //     // const closeButton = document.querySelector(".close");
  //     // closeButton.addEventListener("click", () => {
  //     //   closeButtonAction(activeSensorMarker, "purpleair");
  //     // });
  //     // resolve(purpleairInfo);
  //     // });
  //   }

  // }

  markerPA(sidebar) {
    // markerPA = () => {
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

      let sensor = {
        Site_Id: purpleairSensor[0],
        SiteName: purpleairSensor[1],
        Latitude: purpleairSensor[2],
        Longitude: purpleairSensor[3],
      };
      console.log("buckle sensor: ", sensor);
      console.log("buckle1 sensor: ", purpleairSensorLatitude);
      console.log("buckle2 sensor: ", sensor.Latitude);

      // var purpleairLatLng1 = L.latLng([
      //   purpleairSensorLatitude,
      //   purpleairSensorLongitude,
      // ]);
      // console.log("buckle3 sensor: ", purpleairLatLng);
      var purpleairLatLng = L.latLng([sensor.Latitude, sensor.Longitude]);
      // console.log("buckle3 sensor: ", purpleairLatLng1);

      let purpleairMarker = L.marker(purpleairLatLng, {
        icon: colorMarker("purpleair", "normal"),
      }).bindTooltip(purpleairSensorName, {
        direction: "top",
      });
      purpleairMarker.on("click", () => {
        if (this.activeStationMarker != null) {
          this.activeStationMarker.setIcon(colorMarker("station", "normal"));
          this.activeStationMarker = null;
        }
        if (this.activeSensorMarker != null) {
          this.activeSensorMarker.setIcon(colorMarker("purpleair", "normal"));
        }
        this.activeSensorMarker = purpleairMarker;
        purpleairMarker.setIcon(colorMarker("purpleair", "selected"));
        // console.log("buckle4 sensor: ", visualizeMode);
        console.log("buckle4.1 sensor: ", this.visualizeMode);

        if (this.visualizeMode === "monitor") {
          generateMarkerContentPA(
            sensor.Site_Id,
            sensor.SiteName,
            sensor.Latitude,
            sensor.Longitude
          )
            .then((content) => {
              // console.log(content);
              sidebar.setContent(content).show();
            })
            .catch((error) => {
              console.error(error);
              // Handle the error if needed
            });
        } else if (this.visualizeMode === "forecast" && this.csvData) {
          console.log("buckle5 sensor: ", this.csvData);
          console.log("buckle6 sensor: ", this.selection.pollutants);
          console.log("buckle7 sensor: ", this.visualizeMode);
          console.log("buckle8 sensor: ", sensor.Site_Id);
          this.sidebar
            .setContent(
              generateMarkerContent(
                sensor,
                this.csvData,
                this.selection.pollutants,
                "sensor"
              )
            )
            .show();

          // this.sidebar
          // .setContent(
          //   generateMarkerContent(
          //     station,
          //     this.csvData,
          //     this.selection.pollutants,
          //     "station"
          //   )
          // )
          // .show();
        }
        // generateMarkerContentPA(
        //   purpleairSensorID,
        //   purpleairSensorName,
        //   purpleairSensorLatitude,
        //   purpleairSensorLongitude
        // )
        //   .then((content) => {
        //     // console.log(content);
        //     sidebar.setContent(content).show();
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //     // Handle the error if needed
        //   });
      });

      // this.purpleairFeatureGroups.addLayer(purpleairMarker);
      this.sensorClusterGroup.addLayer(purpleairMarker);
    });

    // this.map.addLayer(this.sensorClusterGroup);

    // const closeButton = document.querySelector(".close");
    // closeButton.addEventListener("click", () => {
    //   closeButtonAction(activeSensorMarker, "purpleair");
    // });
    // resolve(purpleairInfo);
    // });
  }

  closeSidebar() {
    this.sidebar.hide();
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
