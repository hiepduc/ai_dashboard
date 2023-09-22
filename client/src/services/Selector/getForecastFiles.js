import axios from "axios";

async function getForecastFiles() {
  try {
    const getStationDataURL =
      "http://localhost:8000/api/getForecastFiles";
    const response = await axios.get(getStationDataURL);
    console.log("Forecast files: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default getForecastFiles;
