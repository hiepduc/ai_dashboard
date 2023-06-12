window.addEventListener("DOMContentLoaded", (event) => {
  a("OZONE"); // or whichever pollutant you want to use as default
});

b();
async function b() {
  const pollutantButtons = document.getElementById("selector__air-pollutant");
  var selectedPollutant = pollutantButtons.values;
  // var clickedPollutantButton = document.querySelector(
  //   'input[type="radio"][name="pollutant"]:checked'
  // );
  // console.log(clickedPollutantButton);
  pollutantButtons.addEventListener('change', (event) => {
    selectedPollutant = event.target.value;
    stationsInfo = document.querySelectorAll(".stations-info");
    stationsInfo.forEach((container) => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    });
    a(selectedPollutant);
  });
  // pollutantButtons.forEach((button) => {
  //   button.addEventListener("change", (event) => {
  //     clickedPollutantButton.removeAttribute("checked");
  //     clickedPollutantButton = event.target;
  //     clickedPollutantButton.setAttribute("checked", "checked");
  //     stationsInfo = document.querySelectorAll(".stations-info");
  //     console.log(stationsInfo);
  //     stationsInfo.forEach((container) => {
  //       while (container.firstChild) {
  //         container.removeChild(container.firstChild);
  //       }
  //     });

  //     console.log(event.target.dataset.pollutant);
  //     pollutant = event.target.dataset.pollutant;
  //     a(pollutant);
  //   });
  // });
}
// async function b() {
//   const pollutantButtons = document.querySelectorAll(
//     'input[type="radio"][name="pollutant"]'
//   );
//   var clickedPollutantButton = document.querySelector(
//     'input[type="radio"][name="pollutant"]:checked'
//   );
//   console.log(clickedPollutantButton);
//   pollutantButtons.forEach((button) => {
//     button.addEventListener("change", (event) => {
//       clickedPollutantButton.removeAttribute("checked");
//       clickedPollutantButton = event.target;
//       clickedPollutantButton.setAttribute("checked", "checked");
//       stationsInfo = document.querySelectorAll(".stations-info");
//       console.log(stationsInfo);
//       stationsInfo.forEach((container) => {
//         while (container.firstChild) {
//           container.removeChild(container.firstChild);
//         }
//       });

//       console.log(event.target.dataset.pollutant);
//       pollutant = event.target.dataset.pollutant;
//       a(pollutant);
//     });
//   });
// }

function a(pollutant) {
  $.get("/AQSs_Info/e.csv", function (csvString) {
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
        // markersInfo.push({ title: data[i].title, o3Value: data[i]["O3_Value"] });
        stationNames.push(data[i].title);
        // console.log(stationNames[i]);
        getData(pollutant, stationNames[i], "/AQSs_Info/forecast1.csv").then(
          (result) => {
            // extract data from forecastData
            const forecastXValues = result.map((d) => d.date);
            // console.log("forecastXValues " + forecastXValues);
            const forecastYValues = result.map((d) => d.ozone);
            // console.log("forecastYValues " + forecastYValues);

            let maxOzoneDate = null;

            for (let i = 0; i < forecastData.length; i++) {
              if (forecastData[i].ozone > maxOzone) {
                maxOzone = forecastData[i].ozone;
                maxOzoneDate = forecastData[i].date;
              }
            }

            // console.log("Max ozone value " + stationNames[i] + maxOzone);
            // console.log("Date of max ozone value: " + maxOzoneDate);
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
              // console.log("markersInfo: " + markersInfo);
              // Show loading message/spinner
              // const loading = document.getElementById("loading");
              // loading.style.display = "block";
              displayStationNames(markersInfo);
              // Hide loading message/spinner
              // loading.style.display = "none";
            }
          }
        );
      }
    }
  });
}

async function getData(pollutant, location, csvFilePath) {
  const response = await fetch(csvFilePath);
  const file = await response.text();
  const parsedData = Papa.parse(file, { header: true }).data;

  const locationHeader = `${pollutant}_${location.toUpperCase()}`;
  const data = parsedData.map((row) => parseFloat(row[locationHeader]));
  const forecastHours = parsedData.map((row) =>
    parseFloat(row["forecast_hours"])
  );
  const date = parsedData.map((row) =>
    new Date(row["datetime"]).toLocaleString(undefined, {
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
  return forecastData;
}

function displayStationNames(stationNames) {
  const container = document.querySelector(".stations-info");
  let html = "";

  for (let i = 0; i < stationNames.length; i++) {
    const stationName = stationNames[i].title;
    const stationTime = stationNames[i].time;
    const stationValue = stationNames[i].o3Value.toFixed(2);

    let classList = "";
    if (stationValue <= 2) {
      classList = "good";
    } else if (stationValue <= 3) {
      classList = "moderate";
    } else if (stationValue <= 5) {
      classList = "unhealthy";
    } else {
      classList = "harmful";
    }

    html += `<li class="station-item">
      <div class="station-container">
        
        <div class="station-name">${stationName}</div>
        <div class="station-time">${stationTime}</div>
        <div class="station-value ${classList}">${stationValue}</div>
      </div>
    </li>`;
  }

  container.innerHTML = html;
}
