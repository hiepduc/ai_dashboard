import axios from "axios";
import getPollutantDataForLocation from "../utils/retrieveData";
import getCategoryLabel from "../utils/getCategoryLabel";
import generateChart from "./generateChart";
import { airPollutants } from "../../Configuration/pollutant";

export function generateMarkerContent(station) {
  const title = station.SiteName;
  

  setTimeout(() => {
    const canvas1 = document.getElementById(`marker-chart-${title}`);
    const canvas2 = document.getElementById(`NO2-chart-${title}`);
    const canvas3 = document.getElementById(`WDR-chart-${title}`);
    const canvas4 = document.getElementById(`WSP-chart-${title}`);

    const ctx1 = canvas1.getContext("2d");
    const ctx2 = canvas2.getContext("2d");
    const ctx3 = canvas3.getContext("2d");
    const ctx4 = canvas4.getContext("2d");

    if (canvas1) {
      var timeSelection = document.querySelector("#select-time");
      // console.log(timeSelection);

      let selectedTime = timeSelection.value;
      // console.log(selectedTime);

      var pollutantSelection = document.querySelector("#select-pollutant");
      // console.log(pollutantSelection);
      let selectedPollutant = pollutantSelection.value;
      // console.log(selectedPollutant);

      var selectedPollutantObj = airPollutants.find(
        (pollutant) => pollutant.value === selectedPollutant
      );

      /////////////////////////////////////////////////////
      // Load forecast files
      /////////////////////////////////////////////////////
      getPollutantDataForLocation(station, selectedPollutantObj, "both").then(
        (result) => {
          // console.log(result);
          // extract data from forecastData
          const forecastXValues = result.forecastData.map((d) => d.date);
          const forecastYValues = result.forecastData.map((d) => d.value);
          // console.log("Forecast Y:");
          // console.log(forecastYValues);
          // console.log("X:");
          // console.log(forecastXValues);
          // extract data from historyData
          const historyXValues = result.historyData.map((d) => d.date);
          const historyYValues = result.historyData.map((d) => d.value);
          // console.log("History Y:");
          // console.log(historyYValues);
          // console.log("X:");
          // console.log(historyXValues);
          // console.log(forecastXValues.map((x, i) => ({ x: x, y: forecastYValues[i] })));
          // console.log(historyXValues.map((x, i) => ({ x: x, y: historyYValues[i] })));

          const stationColorIndex = document.querySelector(
            ".marker-title-container"
          );
          const stationCategory = getCategoryLabel(
            selectedPollutantObj,
            forecastYValues[0]
          );
          stationColorIndex.classList.add(stationCategory);

          // generate chart for both canvas elements
          generateChart(
            ctx1,
            selectedPollutantObj,
            historyYValues,
            forecastYValues,
            historyXValues,
            forecastXValues
          );
        }
      );
    }

    let tabs = document.querySelectorAll(".marker-title__tabs h3");
    let tabContents = document.querySelectorAll(".chart");
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        tabContents.forEach((content) => {
          content.classList.remove("active");
        });
        tabs.forEach((tab) => {
          tab.classList.remove("active");
        });
        // tabContents[index].classList.add('active');
        // tabs[index].classList.add('active');

        if (index === 0) {
          tabContents[index].classList.add("active");
          tabs[index].classList.add("active");
        } else {
          tabContents[index].classList.add("active");
          tabs[index].classList.add("active");
          getPollutantDataForLocation(
            title,
            "NO2",
            "./AQSs_Info/forecast1.csv",
            "history"
          ).then((result) => {
            // extract data from historyData
            const historyXValues = result.map((d) => d.date);
            // console.log(historyXValues);
            const historyYValues = result.map((d) => d.value);
            // console.log(historyYValues);

            // generate chart for both canvas elements
            generateChart(
              ctx2,
              airPollutants[2],
              historyYValues,
              historyXValues
            );
          });
          getPollutantDataForLocation(
            title,
            "WDR",
            "./AQSs_Info/forecast1.csv",
            "history"
          ).then((result) => {
            // extract data from historyData
            const historyXValues = result.map((d) => d.date);
            console.log(historyXValues);
            const historyYValues = result.map((d) => d.value);
            console.log(historyYValues);

            // generate chart for both canvas elements
            generateChart(
              ctx3,
              airPollutants[3],
              historyYValues,
              historyXValues
            );
          });
          getPollutantDataForLocation(
            title,
            "WSP",
            "./AQSs_Info/forecast1.csv",
            "history"
          ).then((result) => {
            // extract data from historyData
            const historyXValues = result.map((d) => d.date);
            console.log(historyXValues);
            const historyYValues = result.map((d) => d.value);
            console.log(historyYValues);

            // generate chart for both canvas elements
            generateChart(
              ctx4,
              airPollutants[4],
              historyYValues,
              historyXValues
            );
          });
        }
      });
    });
  }, 0);
  return content;
}
