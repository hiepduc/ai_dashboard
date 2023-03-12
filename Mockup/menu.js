$.get("/AQSs_Info/e.csv", function (csvString) {
  // Use PapaParse to convert string to array of objects
  var data = Papa.parse(csvString, {
    header: true,
  }).data;
  let markersInfo = [];
  let title = [];
  let value = [];
  for (let i = 0; i < data.length - 1; i++) {
    // (function () {
    var row = data[i];
    if (row != null) {
      markersInfo.push({ title: data[i].title, o3Value: data[i]["O3_Value"] });
    }
    // })();
  }

  markersInfo.sort(function (a, b) {
    return b.o3Value - a.o3Value;
  });
  // Call the callback function here after the array is fully populated

  //   markersInfo.push({title: title,value: value});
  console.log(markersInfo);

  displayStationNames(markersInfo);
});

function displayStationNames(stationNames) {
  const container = document.querySelector(".stations-info");

  for (let i = 0; i < stationNames.length; i++) {
    const stationName = stationNames[i].title;
    console.log(stationName);
    const stationValue = stationNames[i].o3Value;
    console.log(stationValue);

    const stationItem = document.createElement("li");
    stationItem.classList.add("station-item");
    // stationItem.setAttribute("data-value-range", getValueRange(stationValue));

    if (stationValue <= 50) {
      stationItem.classList.add("good");
    } else if (stationValue <= 100) {
      stationItem.classList.add("moderate");
    } else if (stationValue <= 150) {
      stationItem.classList.add("unhealthy-sensitive");
    } else {
      stationItem.classList.add("unhealthy");
    }

    const stationContainer = document.createElement("div");
    stationContainer.classList.add("station-container");

    const stationNameElement = document.createElement("div");
    stationNameElement.classList.add("station-name");
    stationNameElement.textContent = stationName;

    const stationValueElement = document.createElement("div");
    stationValueElement.classList.add("station-value");
    stationValueElement.textContent = stationValue;

    stationContainer.appendChild(stationNameElement);
    stationContainer.appendChild(stationValueElement);
    stationItem.appendChild(stationContainer);
    container.appendChild(stationItem);
  }
}
