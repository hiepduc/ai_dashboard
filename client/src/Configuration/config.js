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

// const fileNameParameters = ["regions", "models", "pollutants", "timeScopes"];
const dashboardVisualizationMode = {
  monitor: "monitor",
  forecast: "forecast",
};

const stateConfig = {
  initVisualizationState: dashboardVisualizationMode.monitor,
  initSelectionState: false,
  initSelectedOptions: {
    regions: "", // Initialize selected options for each dropdown list
    pollutants: "", // Example: O3, PM2.5
    timeScopes: "", // Example: 24, 48, 72
    models: "", // Example: LSTM-BNN
    date: "", // Example: 20231015AEST
  },
  initForecastData: null,
  initSliderValue: 0,
  initSliderTimeLabel: ["--", "--", "--"],
  initRightPanelHeader: `Latest AQI observations across NSW`,
  initRightPanelPollutant: "AQC",
};

export {
  dpe_site_data_dirs,
  dpe_site_data_file,
  dateOptions,
  linePlotParams,
  stateConfig,
};
