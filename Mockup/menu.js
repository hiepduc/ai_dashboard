a();
function a() {
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
      let maxOzone = -Infinity;
      if (row != null) {
        // markersInfo.push({ title: data[i].title, o3Value: data[i]["O3_Value"] });
        stationNames.push(data[i].title);
        // console.log(stationNames[i]);
        getOzoneData(
          stationNames[i],
          "/AQSs_Info/forecast1.csv"
        ).then((result) => {
          // extract data from forecastData
          const forecastXValues = result.map((d) => d.date);
          console.log("forecastXValues " + forecastXValues);
          const forecastYValues = result.map((d) => d.ozone);
          console.log("forecastYValues " + forecastYValues);

          let maxOzoneDate = null;

          for (let i = 0; i < forecastData.length; i++) {
            if (forecastData[i].ozone > maxOzone) {
              maxOzone = forecastData[i].ozone;
              maxOzoneDate = forecastData[i].date;
            }
          }

          console.log("Max ozone value " + stationNames[i] + maxOzone);
          console.log("Date of max ozone value: " + maxOzoneDate);
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
            console.log("markersInfo: " + markersInfo);
            displayStationNames(markersInfo);
          }
        });
      }
    }
  });
}

async function getOzoneData(location, csvFilePath) {
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
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  forecastData = [];
  for (let i = 0; i < data.length; i++) {
    if (!isNaN(forecastHours[i]) && forecastHours[i] <= 0) {
      forecastData.push({ date: date[i], ozone: data[i] });
    }
  }
  return forecastData;
}

function displayStationNames(stationNames) {
  const container = document.querySelector(".stations-info");

  for (let i = 0; i < stationNames.length; i++) {
    const stationName = stationNames[i].title;
    console.log(stationName);
    const stationTime = stationNames[i].time;
    console.log(stationTime);
    const stationValue = stationNames[i].o3Value;
    console.log(stationValue);

    const stationItem = document.createElement("li");
    stationItem.classList.add("station-item");

    if (stationValue <= 2) {
      stationItem.classList.add("good");
    } else if (stationValue <= 3) {
      stationItem.classList.add("moderate");
    } else if (stationValue <= 5) {
      stationItem.classList.add("unhealthy");
    } else {
      stationItem.classList.add("harmful");
    }

    const stationContainer = document.createElement("div");
    stationContainer.classList.add("station-container");

    const stationNameElement = document.createElement("div");
    stationNameElement.classList.add("station-name");
    stationNameElement.textContent = stationName;

    const stationTimeElement = document.createElement("div");
    stationTimeElement.classList.add("station-time");
    stationTimeElement.textContent = stationTime;

    const stationValueElement = document.createElement("div");
    stationValueElement.classList.add("station-value");
    stationValueElement.textContent = stationValue;

    stationContainer.appendChild(stationNameElement);
    stationContainer.appendChild(stationTimeElement);
    stationContainer.appendChild(stationValueElement);
    stationItem.appendChild(stationContainer);
    container.appendChild(stationItem);
  }
}
