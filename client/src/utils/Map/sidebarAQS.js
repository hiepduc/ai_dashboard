// import axios from "axios";
// import getPollutantDataForLocation from "../retrieveData";
import getCategoryLabel from "../helper/getCategoryLabel";
import generateChart from "./generateChart";
// import { airPollutants } from "../../Configuration/pollutant";
import MarkerContent from "./markerContent";
import { replaceSpace } from "../string/stringProcess";
import { findAirPollutantByLabel } from "../helper/lookupHelper";

export function generateMarkerContent(station, regionData, selectedPollutant) {
  const title = station.SiteName;
  console.log(station);

  const content = MarkerContent(station, regionData);
  // console.log("Content ", content);
  setTimeout(() => {
    const canvas1 = document.getElementById(`marker-chart-${title}`);
    // const canvas2 = document.getElementById(`NO2-chart-${title}`);
    // const canvas3 = document.getElementById(`WDR-chart-${title}`);
    // const canvas4 = document.getElementById(`WSP-chart-${title}`);

    const ctx1 = canvas1.getContext("2d");
    // const ctx2 = canvas2.getContext("2d");
    // const ctx3 = canvas3.getContext("2d");
    // const ctx4 = canvas4.getContext("2d");

    if (canvas1) {

      var selectedPollutantObj = findAirPollutantByLabel(selectedPollutant);

      // Load forecast files
      const historyYValues =
        regionData.data.stations[replaceSpace(title.toUpperCase())].histValue;

      const forecastYValues =
        regionData.data.stations[replaceSpace(title.toUpperCase())]
          .forecastValue;

      const sidebarHeaderIndicator = getCategoryLabel(
        selectedPollutantObj,
        forecastYValues[0]
      );
      const markerHeader = document.querySelector(".marker-header");
      if (markerHeader) {
        markerHeader.classList.add(sidebarHeaderIndicator);
      }

      generateChart(
        ctx1,
        selectedPollutantObj,
        historyYValues,
        forecastYValues,
        regionData.data.time.histTime,
        regionData.data.time.forecastTime
      );
    }

    // let tabs = document.querySelectorAll(".marker-title__tabs h3");
    // let tabContents = document.querySelectorAll(".chart");
    // tabs.forEach((tab, index) => {
    //   tab.addEventListener("click", () => {
    //     tabContents.forEach((content) => {
    //       content.classList.remove("active");
    //     });
    //     tabs.forEach((tab) => {
    //       tab.classList.remove("active");
    //     });
    //     // tabContents[index].classList.add('active');
    //     // tabs[index].classList.add('active');

    //     if (index === 0) {
    //       tabContents[index].classList.add("active");
    //       tabs[index].classList.add("active");
    //     } else {
    //       tabContents[index].classList.add("active");
    //       tabs[index].classList.add("active");
    //       getPollutantDataForLocation(
    //         title,
    //         "NO2",
    //         "./AQSs_Info/forecast1.csv",
    //         "history"
    //       ).then((result) => {
    //         // extract data from historyData
    //         const historyXValues = result.map((d) => d.date);
    //         // console.log(historyXValues);
    //         const historyYValues = result.map((d) => d.value);
    //         // console.log(historyYValues);

    //         // generate chart for both canvas elements
    //         generateChart(
    //           ctx2,
    //           airPollutants[2],
    //           historyYValues,
    //           historyXValues
    //         );
    //       });
    //       getPollutantDataForLocation(
    //         title,
    //         "WDR",
    //         "./AQSs_Info/forecast1.csv",
    //         "history"
    //       ).then((result) => {
    //         // extract data from historyData
    //         const historyXValues = result.map((d) => d.date);
    //         console.log(historyXValues);
    //         const historyYValues = result.map((d) => d.value);
    //         console.log(historyYValues);

    //         // generate chart for both canvas elements
    //         generateChart(
    //           ctx3,
    //           airPollutants[3],
    //           historyYValues,
    //           historyXValues
    //         );
    //       });
    //       getPollutantDataForLocation(
    //         title,
    //         "WSP",
    //         "./AQSs_Info/forecast1.csv",
    //         "history"
    //       ).then((result) => {
    //         // extract data from historyData
    //         const historyXValues = result.map((d) => d.date);
    //         console.log(historyXValues);
    //         const historyYValues = result.map((d) => d.value);
    //         console.log(historyYValues);

    //         // generate chart for both canvas elements
    //         generateChart(
    //           ctx4,
    //           airPollutants[4],
    //           historyYValues,
    //           historyXValues
    //         );
    //       });
    //     }
    //   });
    // });
  }, 0);
  return content;
}
