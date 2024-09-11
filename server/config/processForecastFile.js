import fs from "fs";
import path from "path";

import {
  fileNameParameters,
  paramIndexInFilename,
  stationForecastFolderPath,
  forecastFileExtension,
  forecastFileParamPartition,
} from "./config.js";

const fileNames = fs.readdirSync(stationForecastFolderPath); // getFileName(dataFolderPath);
const fileAllParams = [];
const fileKeyParams = [];
getFileParameters();
const fileOptions = getOptions(fileKeyParams);

/**
 * @returns array of objects containing key Parameters of forecast files from DL models
 */
function getFileParameters() {
  console.log(fileNames);
  fileNames.forEach((fileName) => {
    fileKeyParams.push(extractFileParameters(fileName));
  });
}

/**
 *
 * @param {String} fileName - csv file's name
 * @returns array of string containing Parameters of DL model
 */
function extractFileParameters(fileName) {
  let fileElements = fileName
    .replace(forecastFileExtension, "")
    .split(forecastFileParamPartition); // Extract Parameters
  console.log(fileElements);
  fileAllParams.push(fileElements);
  let parameters = paramIndexInFilename.map((i) => fileElements[i]);
  console.log("paramFiltered: ", parameters);
  // parameters.splice(3, 1);
  // parameters.pop();
  console.log(parameters);
  const keyParams = {};
  fileNameParameters.forEach((param, i) => {
    keyParams[param] = parameters[i]; // Assign corresponding key-value pair
  });
  return keyParams;
}

/**
 *
 * @returns object containing key Parameters and unique values (selection options)
 */
function getOptions() {
  // Initialize an object to store parameters
  const parameters = {};

  // Initialize parameters as sets
  fileNameParameters.forEach((param) => {
    parameters[param] = new Set();
  });
  console.log("Object of Sets: ", parameters);
  fileKeyParams.forEach((param) => {
    console.log("Parameter", param);
    Object.entries(param).forEach(([key, value]) => {
      parameters[key].add(value);
    });
  });
  // Convert all sets to arrays
  for (const param in parameters) {
    parameters[param] = Array.from(parameters[param]);
  }
  return parameters;
}

function forecastFilePath(chosenKeyParams) {
  // Iterate through fileAllParams to find a matching array
  const matchingArray = fileAllParams.find((params) => {
    // Check if all chosen key parameters are present in the current array
    return chosenKeyParams.every((key) => params.includes(key));
  });
  if (matchingArray) {
    const fileName =
      matchingArray.join(forecastFileParamPartition) + forecastFileExtension;
    const filepath = path.join(stationForecastFolderPath, fileName);
    if (fs.existsSync(filepath)) {
      return filepath;
    } else return null;
  }
}

export { fileNames, fileKeyParams, fileOptions, forecastFilePath };
