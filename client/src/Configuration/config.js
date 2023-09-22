// DPIE AQ stations
const dpe_site_data_dirs = "../../AQSs_Info";
const dpe_site_data_file = "/SiteDetails.js";

// Insert plots
const dateOptions = {
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

const linePlotParams = {
  historicalBackgroundColour: "rgba(0,0,0,0.8)",
  historicalLineColour: "rgba(0,0,0,0.3)",
  historicalLabel: "Historical data",
  forecastBackgroundColour: "rgba(0,0,255,0.8)",
  forecastLineColour: "rgba(0,0,255,0.3)",
  forecastLabel: "Forecast data",
  xAxisTitle: "Time",
};

// const content = [
  
//     right: [{
//       heading: "NSW Air Quality Station Ranking",
//       subHeading: "Highest up-to-date PM2.5 level",
//     },]
  
// ];

export {
  dpe_site_data_dirs,
  dpe_site_data_file,
  dateOptions,
  linePlotParams,
  // content,
};
