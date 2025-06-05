// client/src/services/Selector/selectionChange.js

import http from "../../api";   // adjust path if necessary

async function StoreFileData({ regions, pollutants, timeScopes, models }) {
  try {
    console.log({ regions, pollutants, timeScopes, models });
    // The baseURL (VITE_API_BASE_URL) is prefixed automatically:
    const response = await http.get("/api/getForecastInfo", {
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

