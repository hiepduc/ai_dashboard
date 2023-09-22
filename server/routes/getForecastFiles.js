import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const getForecastFiles = Router();

// Get the directory path of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fileNameParameters = ["regions", "pollutants", "timeScopes", "models"];
const combination = {};
fileNameParameters.forEach((param) => {
  combination[param] = [];
});

const dataFolderPath = path.join(__dirname, "../data1");

getForecastFiles.get("/getForecastFiles", (req, res) => {
  fs.readdir(dataFolderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return res.status(500).json({ error: "Error reading folder" });
    }
    const fileNames = [];

    files.forEach((fileName) => {
      //   console.log(fileName);
      const fileParams = getFileParameters(fileName);
      console.log(fileParams);
      fileNames.push(fileParams);
    });

    res.json(fileNames);
  });
});

/**
 *
 * @param {String} fileName - csv file's name
 * @returns array of string containing Parameters of DL model
 */

function getFileParameters(fileName) {
  let parameters = fileName.replace(".csv", "").split("_"); // Extract Parameters
  parameters.splice(3, 1);
  parameters.pop();
  const fileParams = {};
  fileNameParameters.forEach((param, i) => {
    fileParams[param] = parameters[i]; // Assign corresponding key-value pair
  });
  return fileParams;
}

// Export the router so it can be used in other files
export default getForecastFiles;
