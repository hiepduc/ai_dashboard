import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Function to fetch historical observations from the backend
async function fetchHistoricalObservations(
  parameters,
  sites,
  startDate,
  endDate,
  currentState
) {
  if (currentState) return [];
  try {
    const getObsURL = `${BASE_URL}/api/getObs`;
    const response = await axios.get(getObsURL, {
      params: {
        parameters: parameters,
        sites: [sites],
        startDate: startDate,
        endDate: endDate,
      },
    });

    // Handle the response data (historical observations)
    // console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default fetchHistoricalObservations;
