import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
// import "chartjs-plugin-annotation";
import Annotation from "chartjs-plugin-annotation";
import SliderControls from "./time-slider-controls";
import sliderConfig from "../../../../Configuration/sliderContent"; // Path to your sliderConfig.js
import Button from "../left/button";
import stepButton from "../../../../assets/images/step-button.svg";
import pauseButton from "../../../../assets/images/pause-button.svg";
import { useData } from "../../../../services/Selector/dataContext";

// Chart.register(...registerables);
// Chart.register(Annotation);

function Slider() {
  const { csvData, selectedOptions } = useData();
  const [sliderValue, setSliderValue] = useState(0); // Initial value
  const [sliderMax, setSliderMax] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalTime, setIntervalTime] = useState(null);
  const [sliderTimeLabel, setSliderTimeLabel] = useState(["--", "--", "--"]);
  const sliderMin = 0;

  useEffect(() => {
    setSliderMax(selectedOptions["timeScopes"]);
  }, [selectedOptions]);

  useEffect(() => {
    let forecastTime;
    if (csvData) {
      forecastTime = csvData.data.time.forecastTime;
      setSliderTimeLabel([
        forecastTime[0],
        forecastTime[sliderValue],
        forecastTime[forecastTime.length - 1],
      ]);
    }
  }, [csvData, sliderValue]);

  useEffect(() => {
    const markerChartElement = document.querySelector(".marker-chart");
    if (markerChartElement) {
      const markerChartId = markerChartElement.getAttribute("id");
      const forecastChart = Chart.getChart(markerChartId);

      // Translate vertical line with slider value
      const lineAnnotationValue =
        sliderValue + Number(selectedOptions.timeScopes);
      forecastChart.options.plugins.annotation.annotations.vertLine.xMin =
      lineAnnotationValue;

      forecastChart.options.plugins.annotation.annotations.vertLine.xMax =
      lineAnnotationValue;

      // Update chart annotations
      const y = forecastChart.data.datasets[1].data[sliderValue].y.toFixed(2);
      const x = forecastChart.data.datasets[1].data[sliderValue].x;
      // Update the label content of the vertical line annotation
      forecastChart.options.plugins.annotation.annotations.vertLine.label.content =
        [`${x}`, `Forecast data: ${y}`];
      forecastChart.update();
    }

    // Additional chart updates as needed based on sliderValue
  }, [sliderValue, selectedOptions.timeScopes]);

  const handleSliderChange = (event) => {
    setSliderValue(parseInt(event.target.value));
  };

  // const handlePlayPauseClick = () => {
  //   if (!isPlaying) {
  //     setIsPlaying(true);
  //     autoIncreSliderValue();
  //   } else {
  //     setIsPlaying(false);
  //     clearInterval(intervalTime);
  //   }
  // };

  // const autoIncreSliderValue = () => {
  //   intervalTime = setInterval(() => {
  //     const nextValue = (sliderValue + 1) % 24;
  //     setSliderValue(nextValue);
  //   }, 1000);
  // };

  const handleStepForward = () => {
    // Implement your step forward logic here
    if (sliderValue >= sliderMax - 1) {
      setSliderValue(0);
    } else {
      setSliderValue((prevState) => prevState + 1);
    }
  };

  const handleStepBackward = () => {
    // Implement your step backward logic here
    if (sliderValue <= sliderMin) {
      setSliderValue(0);
    } else {
      setSliderValue((prevState) => prevState - 1);
    }
  };

  const handleAutoForwardToggle = (isPlaying) => {
    if (!isPlaying) {
      setIsPlaying(true);
      autoIncreSliderValue();
    } else {
      setIsPlaying(false);
      if (intervalTime) {
        clearInterval(intervalTime);
        setIntervalTime(null);
      }
    }
  };

  const autoIncreSliderValue = () => {
    const newIntervalTime = setInterval(() => {
      setSliderValue((prevValue) => {
        if (prevValue >= sliderMax - 1) {
          clearInterval(intervalTime);
          setIsPlaying(false);
          return prevValue;
        }
        return prevValue + 1;
      });
    }, 1000);
    setIntervalTime(newIntervalTime);
  };

  console.log("Test", sliderConfig.controls[0].childClass);
  return (
    <div className="time-slider" id="slider-bar">
      <input
        id="time-input"
        className="slider"
        type="range"
        min={sliderMin}
        max={sliderMax - 1}
        step="1"
        value={sliderValue}
        onChange={handleSliderChange}
      />
      <div className={sliderConfig.labels[0].parentClass}>
        {sliderConfig.labels[0].indicator.map((label, index) => (
          <div className={sliderConfig.labels.childClass} key={label.id}>
            {label.text} <span id={label.id}>{sliderTimeLabel[index]}</span>
          </div>
        ))}
      </div>
      <SliderControls
        onStepForward={handleStepForward}
        onStepBackward={handleStepBackward}
        onAutoForwardToggle={handleAutoForwardToggle}
      />
    </div>
  );
}

export default Slider;
