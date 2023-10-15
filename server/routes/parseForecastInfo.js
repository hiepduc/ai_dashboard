import { Router } from "express";
// import { Papa } from "papaparse";
import fs from "fs";
import csvParser from "csv-parser";
import {
  dateOptions,
  forecastFileVariable,
  localTimeSetting,
  csvDatabasePath,
} from "../config/config.js";
import { forecastFilePath } from "../config/processForecastFile.js";
import { findAirPollutantByLabel } from "../config/pollutant.js";

const parseForecastInfo = Router();

async function ParseCSV(csvFilePath) {
  // Create a promise wrapper for fs.readFile
  // csvParser parses data of csv file row-by-row
  let csvData = [];
  let statsData = [];
  let isFirstTable = true;

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row) => {
        if (Object.keys(row).length === 0) {
          isFirstTable = false;
        }
        if (isFirstTable) {
          csvData.push(row);
        } else {
          statsData.push(row);
        }
      })
      .on("end", () => {
        statsData = statsData.filter((obj) => Object.keys(obj).length > 0);
        resolve({ firstTable: csvData, statsTable: statsData }); // Resolve with both tables
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

function rankStations(siteName, value, timestamp, result) {
  if (!result.ranking[siteName] || value > result.ranking[siteName].maxValue) {
    result.ranking[siteName] = {
      maxValue: value,
      timestamp: timestamp,
    };
  }
}

function addTimestampToSet(timestamp, timeSet, result) {
  if (!timeSet.has(timestamp)) {
    timeSet.add(timestamp);
    result.push(timestamp);
  }
}

function processStationEntry(entry, pollutant, result) {
  const stationKeys = Object.keys(entry).filter((key) =>
    key.startsWith(`${pollutant}_`)
  );

  const timestamp = new Date(
    entry[forecastFileVariable.timestamp]
  ).toLocaleString(localTimeSetting, dateOptions);

  const forecastTimeSet = new Set();
  const histTimeSet = new Set();

  stationKeys.forEach((stationKey) => {
    const siteName = stationKey.replace(`${pollutant}_`, "");
    const value = parseFloat(entry[stationKey]);
    const forecastHours = parseInt(entry[forecastFileVariable.hour]);

    if (!isNaN(value)) {
      if (!result.data.stations[siteName]) {
        result.data.stations[siteName] = {
          forecastValue: [],
          histValue: [],
        };
      }

      if (forecastHours > 0) {
        rankStations(siteName, value, timestamp, result);
        addTimestampToSet(
          timestamp,
          forecastTimeSet,
          result.data.time.forecastTime
        );
        result.data.stations[siteName].forecastValue.push(value);
      } else {
        addTimestampToSet(timestamp, histTimeSet, result.data.time.histTime);
        result.data.stations[siteName].histValue.push(value);
      }
    }
  });
}

function processStatsData(statsTable, result) {
  const stats = Object.values(statsTable[0]).slice(1);
  // console.log("stats", stats);
  const statsValue = [];
  for (let i = 1; i < statsTable.length; i++) {
    statsValue.push(Object.values(statsTable[i]));
  }
  console.log("statsValue", statsValue);
  statsValue.forEach((entry) => {
    result.stats[entry[0]] = {};
    stats.forEach((stat, index) => {
      result.stats[entry[0]][stat] = entry[index + 1];
    });
  });
}

function ProcessParsedCSV(parsedData, pollutant) {
  const result = {
    ranking: {},
    data: { time: { forecastTime: [], histTime: [] }, stations: {} },
    stats: {},
  };

  parsedData.firstTable.forEach((entry) => {
    processStationEntry(entry, pollutant, result);
  });

  if (Object.keys(parsedData.statsTable).length !== 0) {
    processStatsData(parsedData.statsTable, result);
  }

  return result;
}

parseForecastInfo.get("/getForecastInfo", async (req, res) => {
  try {
    let chosenKeyParams = Object.values(req.query);
    console.log(chosenKeyParams);

    const csvFilePath = forecastFilePath(chosenKeyParams);
    console.log("csvFilePath: ", csvFilePath);

    const parsedData = await ParseCSV(csvFilePath);
    console.log("Parsed data: ", parsedData);
    const pollutant = findAirPollutantByLabel(req.query.selectedPollutant);
    const processedData = ProcessParsedCSV(parsedData, pollutant.ParameterCode);

    // Send the transformed data to the frontend
    res.json(processedData);
  } catch (error) {
    // console.error("Error transforming data:", error);
    res.status(500).json({ error: "Error transforming data!" });
  }
});

// Export the router so it can be used in other files
export default parseForecastInfo;
