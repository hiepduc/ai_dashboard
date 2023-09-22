import axios from "axios";

async function updateSelection() {
  try {
    const getOptionsURL = "http://localhost:8000/api/getOptions";
    const response = await axios.get(getOptionsURL);
    console.log("Response data:", response);
    //   const numberOfFields = Object.keys(response.data).length;
    //   console.log("Number of fields:", numberOfFields);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default updateSelection;
