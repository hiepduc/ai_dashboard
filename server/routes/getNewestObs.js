import { Router } from "express";
import axios from "axios";
import cron from "node-cron";
import { siteIDs } from "../config/siteDetails.js";
import { findAirPollutantByCode } from "../config/pollutant.js";

const getNewestObs = Router();
let storedNewestObs = [];
const updateIntervalInMinutes = 20;
const cronSchedule = `*/${updateIntervalInMinutes} * * * *`; // Convert the interval to the cron schedule format
const timezoneDiff = 10;

class AQMSAPI {
  constructor() {
    this.url_api = "https://data.airquality.nsw.gov.au";
    this.headers = {
      "content-type": "application/json",
      accept: "application/json",
    };
    this.get_observations = "api/Data/get_Observations";
  }

  async getObs(ObsRequest) {
    const query = new URL(this.get_observations, this.url_api);
    console.log("AAA!");
    console.log(ObsRequest);

    const response = await axios.post(query.toString(), ObsRequest, {
      headers: this.headers,
    });

    return response.data;
  }
}

const ObsRequestTemplate = (parameters, sites, startDate, endDate) => ({
  Parameters: [parameters.ParameterCode],
  Sites: sites,
  StartDate: startDate,
  EndDate: endDate,
  Categories: [parameters.Category],
  SubCategories: [parameters.SubCategory],
  Frequency: [parameters.Frequency],
});

getNewestObsAPI();
// Schedule the function to run periodically
cron.schedule(cronSchedule, getNewestObsAPI);

async function getNewestObsAPI() {
  console.log("Hey ya!");
  // Get the current date
  let today = new Date();
  today.setHours(today.getHours() + timezoneDiff);
  let todayFormatted = today.toISOString().split("T")[0];
  console.log("today", todayFormatted)

  // Add 1 day to the current date to get tomorrow's date
  let tomorrow = new Date();
  tomorrow.setHours(tomorrow.getHours() + timezoneDiff);
  tomorrow.setDate(tomorrow.getDate() + 1);
  // Format the date as "yyyy-mm-dd"
  let tomorrowFormatted = tomorrow.toISOString().split("T")[0];

  const parameter = findAirPollutantByCode("AQC");
  //   console.log("parameter ", parameter);
  const aqmsAPI = new AQMSAPI();
  const ObsRequest = ObsRequestTemplate(
    parameter,
    siteIDs,
    todayFormatted,
    tomorrowFormatted
  );
  console.log("ObsRequest: ", ObsRequest);
  try {
    const response = await aqmsAPI.getObs(ObsRequest);

    storedNewestObs = processNewestObs(response);
    console.log("Data fetched and processed successfully:");
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

function processNewestObs(response) {
  // Step 1: Filter out objects with "AirQualityCategory" as null or "N/A"
  const filteredData = response.filter(
    (item) => item.AirQualityCategory !== "N/A" && item.AirQualityCategory!== null
  );

  // Step 2: Group the filtered data by "Site_Id"
  const groupedData = filteredData.reduce((groups, item) => {
    const { Site_Id } = item;
    if (!groups[Site_Id]) {
      groups[Site_Id] = [];
    }
    groups[Site_Id].push(item);
    return groups;
  }, {});

  // Step 3: Find the object with the largest "Hour" in each group
  const result = Object.values(groupedData).map((group) =>
    group.reduce((maxItem, currentItem) =>
      currentItem.Hour > maxItem.Hour ? currentItem : maxItem
    )
  );
  return result;
}

// Endpoint to get the newest data
getNewestObs.get("/getNewestObs", (req, res) => {
  try {
    // Send the stored data as a JSON response to the frontend
    res.json(storedNewestObs);
  } catch (error) {
    console.error("Error retrieving stored data:", error);
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
});

export default getNewestObs;

/*
async function fetchDataForAllStations(
  stationIds,
  parameters,
  startDate,
  endDate
) {
  const aqmsAPI = new AQMSAPI();

  const promises = stationIds.map(async (stationId) => {
    try {
      // Call the getObs method of the AQMSAPI class to fetch data
      const ObsRequest = ObsRequestTemplate(
        parameters,
        stationId,
        startDate,
        endDate
      );
      const response = await aqmsAPI.getObs(ObsRequest);
      return { stationId, data: response };
    } catch (error) {
      // Handle any errors here, e.g., log the error
      console.error(`Error fetching data for station ${stationId}:`, error);
      return { stationId, error: "An error occurred while fetching data" };
    }
  });

  const results = await Promise.all(promises);
  return results;
}
*/

// Using async/await and Promise.all
/*
async function fetchDataForAllStations(stationIds) {
    const promises = stationIds.map(async (stationId) => {
      const data = await fetchDataForStation(stationId);
      return { stationId, data };
    });
  
    const results = await Promise.all(promises);
    return results;
  }
  */

// Throttling: If the third-party API has rate limiting or concurrency limitations, you may need to implement throttling to ensure you don't exceed those limits. Libraries like p-limit can help you with this.
/*
const pLimit = require('p-limit');

const limit = pLimit(5); // Limit to 5 concurrent requests

async function fetchDataForAllStations(stationIds) {
  const promises = stationIds.map(async (stationId) => {
    return limit(() => fetchDataForStation(stationId));
  });

  const results = await Promise.all(promises);
  return results;
}

*/
