
// client/src/services/Selector/updateSelection.js

  import http from "../../api";   // adjust path if necessary

async function updateSelection() {
  try {
    // http.baseURL is import.meta.env.VITE_API_BASE_URL, so this goes to `${API_BASE}/api/getOptions`
    const response = await http.get("/api/getOptions");
    console.log("Response data:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default updateSelection;

