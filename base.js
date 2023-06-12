const airPollutants = [
    {
      name: "OZONE",
      unit: "ppb",
      categories: [
        { label: "Good", range: "< 5.4" },
        { label: "Fair", range: "5.4 - 8.0" },
        { label: "Poor", range: "8.0 - 12.0" },
        { label: "Very poor", range: "12.0 - 16.0" },
        { label: "Ext poor", range: "> 16.0" },
      ],
    },
    {
      name: "PM25",
      unit: "ppm",
      categories: [
        { label: "Good", range: "< 25" },
        { label: "Fair", range: "25 - 50" },
        { label: "Poor", range: "50 - 100" },
        { label: "Very poor", range: "100 - 300" },
        { label: "Ext poor", range: "> 300" },
      ],
    },
  ];