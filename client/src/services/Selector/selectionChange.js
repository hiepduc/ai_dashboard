// import { useData } from "./dataContext";
// import { useState, useEffect } from "react";
import axios from "axios";

async function StoreFileData({ regions, pollutants, timeScopes, models }) {
  try {
    console.log({ regions, pollutants, timeScopes, models });
    const getForecastInfoURL = "http://localhost:8000/api/getForecastInfo";
    const response = await axios.get(getForecastInfoURL, {
      params: {
        selectedRegion: regions,
        selectedPollutant: pollutants,
        selectedTime: timeScopes,
        selectedModel: models,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export { StoreFileData };
