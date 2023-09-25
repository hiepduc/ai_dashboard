import express from "express";
import cors from "cors";

import getForecastOptions from "../routes/parseForecastOptions.js";
import parseForecastInfo from "../routes/parseForecastInfo.js";
import parseForecastCombination from "../routes/getCombinations.js";
import getForecastFiles from "../routes/getForecastFiles.js";
import getObs from "../routes/getObs.js";
import getCurrentObs from "../routes/getCurrentObs.js";
import getNewestObs from "../routes/getNewestObs.js";

const app = express();
const port = 8000;

app.use(cors());

// Use the route files
app.use("/api", getForecastOptions);

app.use("/api", getObs);

app.use("/api", getCurrentObs);

app.use("/api", parseForecastInfo);

app.use("/api", parseForecastCombination);

app.use("/api", getForecastFiles);

app.use("/api", getNewestObs);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
