// DCCEEW AQ stations
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Main settings for the forecast data folders
const stationForecastFolderPath = path.resolve(
  __dirname,
  "../data/forecast_test040424"
); // Define Path to AQ station forecast data folder Here
const sensorForecastFolderPath = path.resolve(__dirname, "../data/pas"); // Define Path to PAS forecast data folder Here

// Forecast file settings
const forecastFileExtension = ".csv";
const forecastFileParamPartition = "_";
const fileNameParameters = [
  "regions",
  "pollutants",
  "timeScopes",
  "models",
  "date",
];
const paramIndexInFilename = [0, 1, 3, 4, 5];

// Insert plots
const dateOptions = {
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

// const linePlotParams = {
//   historicalBackgroundColour: "rgba(0,0,0,0.8)",
//   historicalLineColour: "rgba(0,0,0,0.3)",
//   historicalLabel: "Historical data",
//   forecastBackgroundColour: "rgba(0,0,255,0.8)",
//   forecastLineColour: "rgba(0,0,255,0.3)",
//   forecastLabel: "Forecast data",
//   xAxisTitle: "Time",
// };

const forecastFileVariable = {
  hour: "forecast_hours",
  timestamp: "datetime",
};

const localTimeSetting = "en-AU";

export {
  dateOptions,
  forecastFileVariable,
  sensorForecastFolderPath,
  localTimeSetting,
  stationForecastFolderPath,
  forecastFileExtension,
  forecastFileParamPartition,
  fileNameParameters,
  paramIndexInFilename,
};
