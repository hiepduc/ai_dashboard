import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const parseForecastCombination = Router();

// Get the directory path of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fileNameParameters = ["regions", "pollutants", "timeScopes", "models"];
const combination = {};
fileNameParameters.forEach((param) => {
  combination[param] = [];
});

const dataFolderPath = path.join(__dirname, "../data1");

parseForecastCombination.get("/getForecastCombination", (req, res) => {
  fs.readdir(dataFolderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return res.status(500).json({ error: "Error reading folder" });
    }

    // // Process the list of filenames and extract options
    // const regions = new Set();
    // const timeScopes = new Set();
    // const pollutants = new Set();
    // const models = new Set();

    files.forEach((fileName) => {
      //   console.log(fileName);
      const fileParams = getFileParameters(fileName);
      console.log(fileParams);
      populateObjectProperties(combination, fileParams);

      //   const a = fileName.replace(".csv", "").split("_");
      //   const [region, model, pollutant, input, timeScope] = fileName
      //     .replace(".csv", "")
      //     .split("_");

      //   regions.add(region);
      //   models.add(model);
      //   timeScopes.add(timeScope);
      //   pollutants.add(pollutant);
    });

    // Convert sets to arrays and sort if needed
    // const regionOptions = Array.from(regions);
    // const modelOptions = Array.from(models);
    // const timeScopeOptions = Array.from(timeScopes);
    // const pollutantOptions = Array.from(pollutants);

    // Send the extracted options as a response
    // res.json({
    //   regions: regionOptions,
    //   timeScopes: timeScopeOptions,
    //   pollutants: pollutantOptions,
    //   models: modelOptions,
    // });
    res.json(combination);
  });
});

/**
 *
 * @param {String} fileName - csv file's name
 * @returns array of string containing Parameters of DL model
 */

function getFileParameters(fileName) {
  let parameters = fileName.replace(".csv", "").split("_"); // Extract Parameters
  console.log("parameters1", parameters);
  parameters.splice(3, 1);
  console.log("parameters2", parameters);

  parameters.pop();
  console.log("parameters3", parameters);

  const fileParams = {};
  fileNameParameters.forEach((param, i) => {
    fileParams[param] = parameters[i]; // Assign corresponding key-value pair
  });
  return fileParams;
}

/**
 *
 * @param {Object} selectionMatrix - object containing selection options for dropdown lists
 * @param {Object} newFileParameters - object containing Parameters extracted from csv files' names
 */

function populateObjectProperties(selectionMatrix, newFileParameters) {
  const keyNames = Object.keys(selectionMatrix);
  Object.entries(selectionMatrix).forEach(([parentKey, parentValue]) => {
    // Find child object with matching principal key
    const available = parentValue.find(
      (child) => child[parentKey] === newFileParameters[parentKey]
    );
    // console.log("Available", available);
    // Populate parent key with new child object resulting from csv file's Parameters
    if (available === undefined) {
      const newChild = {};
      keyNames.forEach((childKey) => {
        if (parentKey === childKey) {
          newChild[childKey] = newFileParameters[childKey];
        } else {
          newChild[childKey] = [newFileParameters[childKey]];
        }
      });
      selectionMatrix[parentKey].push(newChild);
    } else {
      // Add new option to non-principal keys of existing child object
      Object.keys(available).forEach((populatedChildKey) => {
        if (populatedChildKey !== parentKey) {
          if (
            !available[populatedChildKey].includes(
              newFileParameters[populatedChildKey]
            )
          ) {
            available[populatedChildKey].push(
              newFileParameters[populatedChildKey]
            );
          }
        }
      });
    }
  });
}

// Export the router so it can be used in other files
export default parseForecastCombination;
