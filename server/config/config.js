// DPIE AQ stations
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const forecastFolderPath = "../data1";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFolderPath = path.join(__dirname, forecastFolderPath);
const forecastFileExtension = ".csv";
const forecastFileParamPartition = "_";
const fileNameParameters = [
  "regions",
  "pollutants",
  "timeScopes",
  "models",
  "date",
];
const paramIndexInFile = [0, 2, 4, 5, 8];

// const csvDatabasePath = (
//   selectedRegion,
//   selectedPollutant,
//   selectedTime,
//   selectedModel,
//   forecastFileName
// ) => {
//   const inputTimes = [24, 48, 72];
//   for (const possibleInput of inputTimes) {
//     const filepath = path.join(forecastFolderPath, forecastFileName); //`../data1/${selectedRegion}_${selectedPollutant}_${possibleInput}_${selectedTime}_${selectedModel}_model_v1.csv`;
//     if (fs.existsSync(filepath)) {
//       return filepath;
//     }
//     //  else return null;
//   }
// };

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

export {
  dateOptions,
  forecastFileVariable,
  localTimeSetting,
  // csvDatabasePath,
  forecastFolderPath,
  forecastFileExtension,
  forecastFileParamPartition,
  fileNameParameters,
  paramIndexInFile,
  dataFolderPath,
};
