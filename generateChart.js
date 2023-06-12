async function generateChart(
  context,
  pollutant,
  // historyYValues,
  // forecastYValues,
  // historyXValues,
  // forecastXValues
  ...dataSets
) {
  const setNumbers = dataSets.length;
  
  const xValues =
    setNumbers > 2
      ? dataSets[setNumbers - 2].concat(dataSets[setNumbers - 1])
      : dataSets[setNumbers - 1];
  const yValues =
    setNumbers > 2 ? [...dataSets[0], ...dataSets[1]] : [...dataSets[0]];
  const ydataSets = setNumbers > 2 ? (dataSets.slice(0, 2)) : ([dataSets[0]]);
  const a = {
    backgroundColor: setNumbers > 2 ? ["rgba(255,0,0,1.0)", "rgba(0,0,255,1.0)"] : ["rgba(255,0,0,1.0)"],
    borderColor: setNumbers > 2 ? ["rgba(255,0,0,0.2)", "rgba(0,0,255,0.2)"] : ["rgba(255,0,0,0.2)"],
    label: setNumbers > 2 ? ["History data", "Forecast data"] : ["History data"]
  };
  
  console.log(a);
  new Chart(context, {
    type: "line",
    data: {
      labels: xValues,
      datasets: ydataSets.map((dataset, index) => ({
        label: a.label[index],
        fill: false,
        backgroundColor: a.backgroundColor[index],
        borderColor: a.borderColor[index],
        data: dataSets[setNumbers / 2 + index].map((x, i) => ({
          x,
          y: dataset[i],
        })),
      })),
    },
    options: {
      plugins: {
        annotation: {
          annotations: {
            vertLine: {
              type: "line",
              xMin: 12,
              xMax: 12,
              borderColor: "blue",
              borderWidth: 2,
              label: {
                content: dataSets[1][0],
                enabled: true,
                position: "start",
                backgroundColor: "rgba(0,0,0,0.6)",
              },
            },
          },
        },
      },
      responsive: true,
      legend: {
        display: true,
        labels: {
          fontSize: 12,
          fontColor: "#333",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Time",
          },
          ticks: {
            maxRotation: 90,
          },
        },

        y: {
          ticks: {
            suggestedMin: 0,
            suggestedMax: Math.max(...yValues) * 1.1,
          },
          title: {
            display: true,
            text: `${pollutant.name} (${pollutant.unit})`,
          },
        },
      },
    },
  });
}
export default generateChart;
