document.getElementById("time-input").addEventListener("input", (event) => {
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
  document.getElementById("active-hour").innerText = hour12 + ampm + " 12/01";
});

const slider = document.querySelector(".slider");

slider.oninput = function () {
  // const station = "Camden";
  // const chartId = document.querySelector(`[id^="marker-chart-${station}"]`).id;
  // const stationId = chartId.match(/marker-chart-(.*)/)[1];
  // console.log(stationId); // "my-station-name"
  const markerChart = document.querySelector(".marker-chart");
  const markerChartId = markerChart.getAttribute("id");
  //console.log(markerChartId); // prints the id of the element with class name "marker-chart"

  // Get and transform slider value to integer
  const sliderValue = parseInt(this.value);
  // Acquire the chart by class name
  const forecastChart = Chart.getChart(markerChartId);
  // Translate vertical line with slider value
  forecastChart.options.plugins.annotation.annotations.vertLine.xMin =
    sliderValue + 48;
  forecastChart.options.plugins.annotation.annotations.vertLine.xMax =
    sliderValue + 48;
  forecastChart.update();
};
