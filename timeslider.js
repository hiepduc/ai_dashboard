document.getElementById("time-input").addEventListener("input", (event) => {
  const hour = parseInt(event.target.value);

  // converting 0-23 hour to AMPM format
  const ampm = hour >= 12 ? "AM" : "PM";
  const hour12 = hour % 12 ? hour % 12 : 12;

  // update text in the UI
  document.getElementById("active-hour").innerText = hour12 + ampm + " 01/01";
});

// Manual slider adjustment
const slider = document.querySelector(".slider");
// Set the slider min and max values
var timeSelection = document.querySelector("#select-time");
timeSelection.addEventListener("change", function () {
  let selectedTime = parseInt(timeSelection.value);
  const maxHour = selectedTime - 1; // Adjust the max value to selected time
  slider.max = maxHour.toString();
});
slider.oninput = function () {
  updateChart(parseInt(this.value));
};

// PLAY/PAUSE button
var isPlaying = false;
var intervalTime = null;
const playPauseButton = document.querySelector(
  ".time-slider__control--motion img"
);
playPauseButton.addEventListener("click", function () {
  if (!isPlaying) {
    playPauseButton.src = "./assets/images/play-button.svg";
    autoIncreSliderValue();
  } else {
    playPauseButton.src = "./assets/images/pause-button.svg";
    if (intervalTime) {
      clearInterval(intervalTime);
      intervalTime = null;
    }
  }
  isPlaying = !isPlaying;
});

const buttonForward = document.querySelector(".time-slider__control--forward");
buttonForward.addEventListener("click", function () {
  incrementSliderValue("forward");
});

const buttonBackward = document.querySelector(
  ".time-slider__control--backward"
);
buttonBackward.addEventListener("click", function () {
  incrementSliderValue("backward");
});

// Function to increment the slider value and update the chart
function incrementSliderValue(motion) {
  const currentValue = parseInt(slider.value);
  if (motion == "forward") {
    if (slider.value == slider.max) slider.value = 0;
    else slider.value = currentValue + 1;
  } else if (motion == "backward") slider.value = currentValue - 1;
  updateChart(parseInt(slider.value));
}

function autoIncreSliderValue() {
  intervalTime = setInterval(function () {
    const currentValue = parseInt(slider.value);
    if (slider.value == slider.max) slider.value = 0;
    else slider.value = currentValue + 1;
    updateChart(parseInt(slider.value));
  }, 1000);
}

function updateChart(sliderValue) {
  const markerChart = document.querySelector(".marker-chart");
  const markerChartId = markerChart.getAttribute("id");
  // Acquire the chart by class name
  const forecastChart = Chart.getChart(markerChartId);
  // Translate vertical line with slider value
  forecastChart.options.plugins.annotation.annotations.vertLine.xMin =
    sliderValue + 48;
  forecastChart.options.plugins.annotation.annotations.vertLine.xMax =
    sliderValue + 48;
  const y = forecastChart.data.datasets[1].data[sliderValue].y;
  const x = forecastChart.data.datasets[1].data[sliderValue].x;
  // use the y value to update the label content of the vertical line annotation
  forecastChart.options.plugins.annotation.annotations.vertLine.label.content =
    y;
  const sliderForecastTime = document.getElementById("forecast-time");
  sliderForecastTime.innerHTML = x;
  forecastChart.update();
  if (isPlaying && sliderValue == slider.max) {
    playPauseButton.src = "./assets/images/pause-button.svg";
    if (intervalTime) {
      clearInterval(intervalTime);
      intervalTime = null;
    }
    isPlaying = false;
  }
}
