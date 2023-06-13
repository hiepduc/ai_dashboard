async function getPollutantDataForLocation(
  location,
  pollutant,
  csvFilePath,
  dataOption
) {
  const response = await fetch(csvFilePath);
  const file = await response.text();
  const parsedData = Papa.parse(file, { header: true }).data;

  const locationHeader = `${pollutant}_${location.toUpperCase()}`;
  const data = parsedData.map((row) => parseFloat(row[locationHeader]));
  const forecastHours = parsedData.map((row) =>
    parseFloat(row["forecast_hours"])
  );
  console.log(parsedData);
  const dateOptions = {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = parsedData.map((row) =>
    new Date(row["datetime"]).toLocaleString(undefined, {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  console.log(date);
  // {
  //   const datetime = new Date(row["datetime"]);
  //   return new Intl.DateTimeFormat(undefined, dateOptions).format(datetime);
  // }
  // const date = parsedData.map((row) =>
  //   new Date(row["datetime"]).toLocaleString(undefined, {
  //     month: "2-digit",
  //     day: "2-digit",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   })
  // );
  // console.log(date);

  if (dataOption == "forecast") {
    const forecastData = [];
    for (let i = 0; i < data.length; i++) {
      if (!isNaN(forecastHours[i]) && forecastHours[i] > 0) {
        forecastData.push({ date: date[i], value: data[i] });
      }
    }
    return forecastData;
  } else if (dataOption == "history") {
    const historyData = []; //{}
    for (let i = 0; i < data.length; i++) {
      if (!isNaN(forecastHours[i]) && forecastHours[i] <= 0) {
        historyData.push({ date: date[i], value: data[i] });
      }
    }
    return historyData;
  } else if (dataOption == "both") {
    const forecastData = [];
    const historyData = [];
    for (let i = 0; i < data.length; i++) {
      if (!isNaN(forecastHours[i]) && forecastHours[i] > 0) {
        forecastData.push({ date: date[i], value: data[i] });
        console.log("forecastData");
        console.log(date[i]);
        // forecastData["date"].push(date[i]);
        // forecastData["value"].push(data[i]);
      } else if (!isNaN(forecastHours[i]) && forecastHours[i] <= 0) {
        historyData.push({ date: date[i], value: data[i] });
        // historyData["date"].push(date[i]);
        // historyData["value"].push(data[i]);
      }
    }
    return { forecastData, historyData };
  } else {
    return {}; // Return an empty object for invalid dataOption
  }
}
export default getPollutantDataForLocation;
