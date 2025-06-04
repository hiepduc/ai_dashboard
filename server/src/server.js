import express from "express";
import cors from "cors";

import getForecastOptions from "../routes/getForecastOptions.js";
import parseForecastInfo from "../routes/parseForecastInfo.js";
import getForecastFiles from "../routes/getForecastFiles.js";
import getNewestObs from "../routes/getNewestObs.js";
// import getCurrentObs from "../routes/getCurrentObs.js";

const app = express();
// const port = 8000;
const port = process.env.PORT || 8000;

app.use(cors());

// Get all available options (Parameters) of forecast files
app.use("/api", getForecastOptions);

// app.use("/api", getCurrentObs);

// Get forecasts corresponded to selected Parameters
app.use("/api", parseForecastInfo);

// Get key Parameters of all forecast files
app.use("/api", getForecastFiles);

// Get up-to-date AQI observations from DPE API
app.use("/api", getNewestObs);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
