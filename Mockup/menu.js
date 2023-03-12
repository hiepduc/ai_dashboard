var markersInfo = [];

$.get("/AQSs_Info/e.csv", function (csvString) {
  // Use PapaParse to convert string to array of objects
  var data = Papa.parse(csvString, {
    header: true,
    dynamicTyping: true,
  }).data;

  for (let i = 0; i < data.length - 1; i++) {
    (function () {
      var row = data[i];
      if (row != null) {
        markersInfo.push(data[i].title);
      }
    })();
  }
  // Call the callback function here after the array is fully populated
  displayStationNames(markersInfo);
});

function displayStationNames(stationNames) {
  const container = document.querySelector(".stations-info");
  
  for (let i = 0; i < stationNames.length; i++) {
    const stationName = stationNames[i];
    console.log(stationName)
    const stationNameElement = document.createElement("li");
    stationNameElement.classList.add("station-name");
    stationNameElement.textContent = stationName;
    container.appendChild(stationNameElement);
  }
}
