import axios from "axios";

// Function to fetch historical observations from the backend
async function getNewestObs(currentState) {
  if (currentState) return [];
  try {
    const getObsURL = "http://localhost:8000/api/getNewestObs";
    const response = await axios.get(getObsURL);

    // Handle the response data (historical observations)
    // console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching newest observation data:", error);
    throw error;
  }
}

export default getNewestObs;
