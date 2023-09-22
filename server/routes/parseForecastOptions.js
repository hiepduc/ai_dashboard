import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const parseForecastFile = Router();

// Get the directory path of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dataFolderPath = path.join(__dirname, "../data1");

parseForecastFile.get("/getOptions", (req, res) => {
  fs.readdir(dataFolderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return res.status(500).json({ error: "Error reading folder" });
    }

    // Process the list of filenames and extract options
    const regions = new Set();
    const timeScopes = new Set();
    const pollutants = new Set();
    const models = new Set();

    files.forEach((fileName) => {
      const a = fileName.replace(".csv", "").split("_");
      const [region, pollutant, input, timeScope, model] = fileName
        .replace(".csv", "")
        .split("_");

      regions.add(region);
      models.add(model);
      timeScopes.add(timeScope);
      pollutants.add(pollutant);
    });

    // Convert sets to arrays and sort if needed
    const regionOptions = Array.from(regions);
    const modelOptions = Array.from(models);
    const timeScopeOptions = Array.from(timeScopes);
    const pollutantOptions = Array.from(pollutants);

    // Send the extracted options as a response
    res.json({
      regions: regionOptions,
      timeScopes: timeScopeOptions,
      pollutants: pollutantOptions,
      models: modelOptions,
    });
  });
});

// Export the router so it can be used in other files
export default parseForecastFile;
