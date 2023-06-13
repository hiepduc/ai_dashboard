// Data structure for air pollutants and their corresponding categories
export const airPollutants = [
  {
    value: "OZONE",
    label: "O3",
    name: "Ozone",
    unit: "pphm",
    categories: [
      { label: "Good", range: "< 5.4" },
      { label: "Fair", range: "5.4 - 8.0" },
      { label: "Poor", range: "8.0 - 12.0" },
      { label: "Very poor", range: "12.0 - 16.0" },
      { label: "Ext poor", range: "> 16.0" },
    ],
  },
  {
    value: "PM25",
    label: "PM25",
    name: "PM 2.5",
    unit: "µg/m³",
    categories: [
      { label: "Good", range: "< 25" },
      { label: "Fair", range: "25 - 50" },
      { label: "Poor", range: "50 - 100" },
      { label: "Very poor", range: "100 - 300" },
      { label: "Ext poor", range: "> 300" },
    ],
  },
  {
    value: "NO2",
    name: "NO2",
    unit: "pphm",
    categories: [
      { label: "Good", range: "< 25" },
      { label: "Fair", range: "25 - 50" },
      { label: "Poor", range: "50 - 100" },
      { label: "Very poor", range: "100 - 300" },
      { label: "Ext poor", range: "> 300" },
    ],
  },
  {
    value: "WDR",
    name: "Wind direction",
    unit: "°",
    categories: [
      { label: "Good", range: "< 25" },
      { label: "Fair", range: "25 - 50" },
      { label: "Poor", range: "50 - 100" },
      { label: "Very poor", range: "100 - 300" },
      { label: "Ext poor", range: "> 300" },
    ],
  },
  {
    value: "WSP",
    name: "Wind speed",
    unit: "m/s",
    categories: [
      { label: "Good", range: "< 25" },
      { label: "Fair", range: "25 - 50" },
      { label: "Poor", range: "50 - 100" },
      { label: "Very poor", range: "100 - 300" },
      { label: "Ext poor", range: "> 300" },
    ],
  },
];
