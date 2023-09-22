import axios from "axios";

async function getForecastCombination() {
  try {
    const getForecastCombinationURL =
      "http://localhost:8000/api/getForecastCombination";
    const response = await axios.get(getForecastCombinationURL);
    console.log("Forecast combination: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default getForecastCombination;
