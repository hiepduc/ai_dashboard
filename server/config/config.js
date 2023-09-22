// DPIE AQ stations
import fs from "fs";
const dpe_site_data_dirs = "../../AQSs_Info";
const dpe_site_data_file = "/SiteDetails.js";

//
const csvDatabasePath = (selectedRegion, selectedPollutant, selectedTime,selectedModel) => {
  const inputTimes = [24, 48, 72];
  for (const possibleInput of inputTimes) {
    const filepath = `../data1/${selectedRegion}_${selectedPollutant}_${possibleInput}_${selectedTime}_${selectedModel}_model_v1.csv`;
    if (fs.existsSync(filepath)) {
      return filepath;
    }
    //  else return null;
  }
};

// Insert plots
const dateOptions = {
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

const linePlotParams = {
  historicalBackgroundColour: "rgba(0,0,0,0.8)",
  historicalLineColour: "rgba(0,0,0,0.3)",
  historicalLabel: "Historical data",
  forecastBackgroundColour: "rgba(0,0,255,0.8)",
  forecastLineColour: "rgba(0,0,255,0.3)",
  forecastLabel: "Forecast data",
  xAxisTitle: "Time",
};

const forecastFileVariable = {
  hour: "forecast_hours",
  timestamp: "datetime",
};

const localTimeSetting = "en-AU";

export { dateOptions, forecastFileVariable, localTimeSetting, csvDatabasePath };
