import generateChart from "./generateChart.js";
import { airPollutants } from "./pollutant.js";
const nwlng = 140.9992792;
const nwlat = -28.15701999;
const selng = 153.638889;
const selat = -37.50528021;

const fields = [
  "name",
  "location_type",
  "latitude",
  "longitude",
  "rssi",
  "pm1.0",
  "pm2.5_alt",
  "pm10.0",
  "temperature",
  "humidity",
  "last_seen",
];

const historyFields = ["pm1.0_atm", "pm2.5_alt", "pm10.0_atm"];

// const url = `https://api.purpleair.com/v1/sensors?fields=${fields.join(
//   "%2C%20"
// )}&nwlng=${nwlng}&nwlat=${nwlat}&selng=${selng}&selat=${selat}`;

// Call the fetchData function initially when the page loads
// fetchData();

// if (humidity) {
//   console.log("Not reliable");
// }

// Call the fetchData function every 2 minutes using setInterval()
// setInterval(fetchData, 120000);

function generateMarkerContentPA(id, title, lat, lng) {
  return new Promise((resolve, reject) => {
    const url = `https://api.purpleair.com/v1/sensors/${id}?sensor_index=${id}&fields=${fields.join(
      "%2C%20"
    )}`;
    const fetchData = () => {
      fetch(url, {
        method: "GET",
        headers: {
          "X-API-Key": "D80F3AFD-DDAD-11ED-BD21-42010A800008",
        },
      })
        .then((responsePurpleAir) => responsePurpleAir.json())
        .then((dataPurpleAir) => {
          // console.log(dataPurpleAir);
          const unixTimestamp = dataPurpleAir.sensor.last_seen;
          const formattedTime = new Date(unixTimestamp * 1000).toLocaleString(
            "en-AU"
          );
          const currTemp = (
            ((dataPurpleAir.sensor.temperature - 32) * 5) /
            9
          ).toFixed(2);
          // console.log(dataPurpleAir.sensor);
          const content = `
              <div class="marker-content">
                <div class="marker-title-container">
                  <h2 class="marker-title">${title} Station</h2>
                  <p class="marker-latlng">
                    <b>Latitude:</b> ${lat} | <b>Longitude:</b> ${lng}
                  </p>
                </div>
  
                <div class="tab-content">
                  <div class="chart active">
                    <div class="stats">
                    <h4>PM1.0: ${dataPurpleAir.sensor["pm1.0"]}</h4>
                    <h4>PM2.5: ${dataPurpleAir.sensor["pm2.5_alt"]}</h4>
                    <h4>PM10.0: ${dataPurpleAir.sensor["pm10.0"]}</h4>
                    <h4>Temperature: ${currTemp}°C</h4>
                    <h4>Humidity: ${dataPurpleAir.sensor.humidity}%</h4>
                    <h4>Reliability: N/A</h4>
                    <h4>Time: ${formattedTime}</h4>
                    <canvas id="pa-marker-chart-${title}" class="marker-chart" width="1" height="1"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            `;
          setTimeout(() => {
            const canvas1 = document.getElementById(`pa-marker-chart-${title}`);

            const ctx1 = canvas1.getContext("2d");

            if (canvas1) {
              // Get current timestamp
              const currentTimestamp = Math.floor(Date.now() / 1000);

              // Get timestamp representing 1 hour ago
              const oneHourAgo = new Date();
              oneHourAgo.setHours(oneHourAgo.getHours() - 1);
              const oneHourAgoTimestamp = Math.floor(
                oneHourAgo.getTime() / 1000
              );
              const urlHist = `https://api.purpleair.com/v1/sensors/${id}/history?sensor_index=${id}&start_timestamp=${oneHourAgoTimestamp}&end_timestamp=${currentTimestamp}&fields=${historyFields.join(
                "%2C"
              )}`;
              fetch(urlHist, {
                method: "GET",
                headers: {
                  "X-API-Key": "D80F3AFD-DDAD-11ED-BD21-42010A800008",
                },
              })
                .then((responsePurpleAir) => responsePurpleAir.json())
                .then((dataPurpleAir) => {
                  // extract data from historyData
                  const historyXValues = dataPurpleAir.data.map(
                    (member) => member[0]
                  );
                  const formattedDates = historyXValues.map((unixTimestamp) => {
                    const date = new Date(unixTimestamp * 1000);
                    const formattedDate = `${date.getDate()}/${
                      date.getMonth() + 1
                    }`;
                    const formattedTime = `${date.getHours()}:${date
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}`;
                    const amOrPm = date.getHours() < 12 ? "am" : "pm";
                    return `${formattedDate}, ${formattedTime} ${amOrPm}`;
                  });
                  const histXValues = formattedDates.reverse();
                  // console.log(histXValues);
                  const historyYValues = dataPurpleAir.data.map(
                    (member) => member[1]
                  );

                  // console.log(historyXValues);
                  // console.log(historyYValues);
                  // generate chart for both canvas elements
                  generateChart(ctx1, airPollutants[1], historyYValues, histXValues);
                });
            }
          }, 0);
          resolve(content);
        })
        .catch((error) => reject(error));
    };

    fetchData();

    // // Update the content every 1 minute
    // setInterval(() => {
    //   fetchData()
    //     .then((content) => {
    //       sidebar.setContent(content);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       // Handle the error if needed
    //     });
    // }, 1000);
  });
}

export default generateMarkerContentPA;
