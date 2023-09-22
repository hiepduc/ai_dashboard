// const router = require("./router");
// const axios = require("axios");
import { Router } from "express";
import axios from "axios";

const getObs = Router();

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
  Parameters: [parameters],
  Sites: sites,
  StartDate: startDate,
  EndDate: endDate,
  Categories: ["Averages"],
  SubCategories: ["Hourly"],
  Frequency: ["Hourly average"],
});

// Initialize AQMSAPI
const aqmsAPI = new AQMSAPI();

// Express route to handle the API request
getObs.get("/getObs", async (req, res) => {
  console.log("called!");
  // console.log("query", req.query);
  // console.log(req.)
  const { parameters, sites, startDate, endDate } = req.query;
  // console.log(sites);
  // const sitesID = Number(sites);
  // Call the ObsRequest_init function to build the request object
  const ObsRequest = ObsRequestTemplate(parameters, sites, startDate, endDate);

  try {
    // Call the getObs function to make the API request
    const response = await aqmsAPI.getObs(ObsRequest);
    // console.log(response);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

export default getObs;
