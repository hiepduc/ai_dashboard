import getPollutantDataForLocation from "./retrieveData.js";
import getCategoryLabel from "./extractCategory.js";

async function menuRender(pollutant, time) {
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
  const container = document.querySelector(".stations-info");
  container.innerHTML = `<div class="loader"></div>`;
  menuGetData(pollutant, time);
}

function menuGetData(pollutant, time) {
  $.get("./AQSs_Info/e.csv", function (csvString) {
    // Use PapaParse to convert string to array of objects
    var data = Papa.parse(csvString, {
      header: true,
    }).data;
    let markersInfo = [];
    let stationNames = [];
    let counter = 0;
    for (let i = 0; i < data.length - 1; i++) {
      var row = data[i];
      let maxOzone = 0;
      if (row != null) {
        stationNames.push(data[i].title);
        getPollutantDataForLocation(
          stationNames[i],
          pollutant.value,
          `./AQSs_Info/forecast_${time}.csv`,
          "forecast"
        ).then((result) => {
          // extract data from forecastData
          // console.log(result);
          const forecastXValues = result.map((d) => d.date);
          const forecastYValues = result.map((d) => d.value);

          let maxOzoneDate = null;

          for (let i = 0; i < forecastYValues.length; i++) {
            if (forecastYValues[i] > maxOzone) {
              maxOzone = forecastYValues[i];
              maxOzoneDate = forecastXValues[i];
            }
          }
          markersInfo.push({
            title: stationNames[i],
            time: maxOzoneDate,
            o3Value: maxOzone,
          });

          // increment counter and check if all async calls have completed
          counter++;
          if (counter === data.length - 1) {
            // all async calls have completed, sort and display data
            markersInfo.sort(function (a, b) {
              return b.o3Value - a.o3Value;
            });
            displayStationNames(pollutant, markersInfo);
          }
        });
      }
    }
  });
}

function displayStationNames(pollutant, stationNames) {
  const container = document.querySelector(".stations-info");
  let html = "";

  for (let i = 0; i < stationNames.length; i++) {
    const stationName = stationNames[i].title;
    const stationTime = stationNames[i].time;
    const stationValue = stationNames[i].o3Value.toFixed(2);

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
