
// client/src/services/Selector/getForecastCombination.js
import http from "../../api";   // ← points to client/src/api.js

async function getForecastCombination() {
  try {
    // No need for “http://localhost:8000” — http.baseURL handles it
    const response = await http.get("/api/getForecastCombination");
    console.log("Forecast combination: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
