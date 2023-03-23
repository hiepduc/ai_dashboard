document.getElementById("timeinput").addEventListener("input", (event) => {
  const hour = parseInt(event.target.value);

  // update the map
  // $.get("/AQSs_Info/e.csv", function (csvString) {
  //   var data = Papa.parse(csvString, {
  //     header: true,
  //   }).data;
  // });

  // converting 0-23 hour to AMPM format
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 ? hour % 12 : 12;

  // update text in the UI
  document.getElementById("active-hour").innerText = hour12 + ampm + ' 12/01';
});

var slider = document.querySelector(".slider");
console.log(slider);
var forecastChart = document.getElementById("marker-chart-Camden");
console.log(forecastChart);
// var chartData = [20, 30, 40, 50, 60, 70, 80, 90, 100];
slider.oninput = function () {
  const sliderValue = this.value;
  const csvFileValue = sliderValue - 11;
  console.log(sliderValue);
  csvFilePath = `/AQSs_Info/forecast_${csvFileValue}.csv`;
  getTempOzoneData("Camden", csvFilePath).then((result) => {
    // extract data from forecastData
    const forecastXValues = result.forecastData.map((d) => d.date);
    const forecastYValues = result.forecastData.map((d) => d.ozone);

    // extract data from historyData
    const historyXValues = result.historyData.map((d) => d.date);
    const historyYValues = result.historyData.map((d) => d.ozone);

    var forecastChart = document.getElementById("marker-chart-Camden");
    console.log(forecastChart);
    // chartData = chartData.map((value) => value + 1);
    var dearSky = Chart.getChart("marker-chart-Camden");
    // console.log(dearSky.data);
    dearSky.data.labels = historyXValues.concat(forecastXValues);
    dearSky.data.datasets[0].data = historyXValues.map((x, i) => ({x: x, y: historyYValues[i]}));
    dearSky.data.datasets[1].data = forecastXValues.map((x, i) => ({x: x, y: forecastYValues[i]}));
    // dearSky.options.scales.x.ticks.maxRotation = 90;
    a = Math.ceil( Math.max(...historyYValues, ...forecastYValues) * 1.1 );
    console.log("max " + Math.max(...historyYValues, ...forecastYValues));
    console.log("a " +a);
    dearSky.options.scales.y.suggestedMax = a;
    dearSky.update();
  });
};

// getTimeData(stationNames[i], "/AQSs_Info/");

async function getTempOzoneData(location, csvFilePath) {
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
