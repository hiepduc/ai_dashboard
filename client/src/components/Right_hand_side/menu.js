import getPollutantDataForLocation from "../Inputs/retrieveData.js";
import getCategoryLabel from "./getCategoryLabel.js";
import * as sites from "../../AQSs_Info/SiteDetails.js";

async function menuRender(region, pollutant, time) {
  // Update heading of the right panel
  const highestPollutant = document.querySelector(".highest-pollutant");
  highestPollutant.innerHTML = `Highest ${pollutant.name} level in the ${time}h forecast`;
  const pollutantUnit = document.querySelector(".station-value");
  pollutantUnit.innerHTML = pollutant.unit;

  // Delete children element of previous menu
  const stationsInfo = document.querySelectorAll(".stations-info");
  stationsInfo.forEach((container) => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  });
  // Generate spinning loader
  const container = document.querySelector(".stations-info");
  container.innerHTML = `<div class="loader"></div>`;
  menuGetData(region, pollutant, time);
}

// Retrieve and manipulate forecast data of region
function menuGetData(selectedRegion, pollutant, time) {
  let markersInfo = [];
  // Retrieve info of each station in selected region
  sites.regionDetails.forEach((region) => {
    if (selectedRegion === region.name) {
      let counter = 0;
      const data = region.stations.length;
      console.log(data);
      region.stations.forEach((station) => {
        getPollutantDataForLocation(station, pollutant, "forecast").then(
          (result) => {
            // extract data from forecastData
            // console.log(result);
            const forecastTimes = result.map((d) => d.date);
            const forecastValues = result.map((d) => d.value);
            let maxPollutantValue = 0;
            let maxPollutantTime = "N/A";
            // Get max value of pollutant in forecast
            for (let i = 0; i < forecastValues.length; i++) {
              if (forecastValues[i] > maxPollutantValue) {
                maxPollutantValue = forecastValues[i];
                maxPollutantTime = forecastTimes[i];
              }
            }
            markersInfo.push({
              title: station.SiteName,
              time: maxPollutantTime,
              maxValue: maxPollutantValue,
            });

            // increment counter and check if all async calls have completed
            counter++;
            console.log(counter);
            if (counter === data) {
              // all async calls have completed, sort and display data
              markersInfo.sort(function (a, b) {
                return b.maxValue - a.maxValue;
              });
              console.log("Display");
              displayStationNames(pollutant, markersInfo);
            }
          }
        );
      });
    }
  });
}

// Populate ranking
function displayStationNames(pollutant, stationNames) {
  const container = document.querySelector(".stations-info");
  let html = "";

  for (let i = 0; i < stationNames.length; i++) {
    const stationName = stationNames[i].title;
    const stationTime = stationNames[i].time;
    const stationValue = stationNames[i].maxValue.toFixed(2);

    const classList = getCategoryLabel(pollutant, stationValue);

    html += `<li class="station-item">
      <div
        class="station-container"
        style="border-left: 8px solid var(--${classList})"
      >
        <div class="station-name">${stationName}</div>
        <div class="station-time">${stationTime}</div>
        <div class="station-value ${classList}">${stationValue}</div>
      </div>
    </li>`;
  }
  container.innerHTML = html;
}
export { menuRender };
