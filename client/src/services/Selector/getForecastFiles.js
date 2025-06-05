
// src/services/Selector/getForecastFiles.js
import http from "../../api";   // ← adjust the relative path to src/api.js

async function getForecastFiles() {
  try {
    // Just use the path. Axios will prepend API_BASE behind the scenes.
    const response = await http.get("/api/getForecastFiles");
    console.log("Forecast files: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default getForecastFiles;
