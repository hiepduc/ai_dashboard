import { Router } from "express";
import { fileKeyParams } from "../config/processForecastFile.js";

const getForecastFiles = Router();

getForecastFiles.get("/getForecastFiles", (req, res) => {
  try {
    res.json(fileKeyParams);
  } catch (err) {
    console.error("Error retrieving stored data:", err);
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
});

// Export the router so it can be used in other files
export default getForecastFiles;
