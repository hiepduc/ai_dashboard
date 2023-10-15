import { Router } from "express";
import { fileOptions } from "../config/processForecastFile.js";

const parseForecastFile = Router();

parseForecastFile.get("/getOptions", (req, res) => {
  console.log("Options:", fileOptions);
  res.json(fileOptions);
});

// Export the router so it can be used in other files
export default parseForecastFile;
