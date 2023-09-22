import {linePlotParams} from "../../Configuration/config.js"
import { Chart, registerables } from "chart.js";
import "chartjs-plugin-annotation";
import Annotation from "chartjs-plugin-annotation";

Chart.register(...registerables);
Chart.register(Annotation);

async function generateChart(
  context,
  pollutant,
  ...dataSets // dataSets: yHistoryValue, yForecastValue, xHistoryValue, xForecastValue
) {
  const setNumbers = dataSets.length;

  const xValues =
    setNumbers > 2
      ? dataSets[setNumbers - 2].concat(dataSets[setNumbers - 1])
      : dataSets[setNumbers - 1];
  const yValues =
    setNumbers > 2 ? [...dataSets[0], ...dataSets[1]] : [...dataSets[0]];
  const ydataSets = setNumbers > 2 ? dataSets.slice(0, 2) : [dataSets[0]];
  const plotParams = {
    backgroundColor:
      setNumbers > 2
        ? [
            linePlotParams.historicalBackgroundColour,
            linePlotParams.forecastBackgroundColour,
          ]
        : [linePlotParams.historicalBackgroundColour],
    borderColor:
      setNumbers > 2
        ? [
            linePlotParams.historicalLineColour,
            linePlotParams.forecastLineColour,
          ]
        : [linePlotParams.historicalLineColour],
    label:
      setNumbers > 2
        ? [linePlotParams.historicalLabel, linePlotParams.forecastLabel]
        : [linePlotParams.historicalLabel],
  };
  let initialForecastValues =
    setNumbers > 2 ? yValues[dataSets[0].length].toFixed(2) : "";
  console.log(ydataSets);
  new Chart(context, {
    type: "line",
    data: {
      labels: xValues,
      datasets: ydataSets.map((dataset, index) => ({
        label: plotParams.label[index],
        fill: false,
        backgroundColor: plotParams.backgroundColor[index],
        borderColor: plotParams.borderColor[index],
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
              xMin: dataSets[0].length,
              xMax: dataSets[0].length,
              borderColor: linePlotParams.forecastBackgroundColour,
              borderWidth: 2,
              label: {
                display: true,
                content: [
                  `${xValues[dataSets[0].length]}`,
                  `Forecast data: ${initialForecastValues}`,
                ],
                enabled: true,
                position: "start",
                backgroundColor: "rgba(0,0,0,0.6)",
                yAdjust: -10,
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
            text: linePlotParams.xAxisTitle,
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
            text: `${pollutant.ParameterDescription} (${pollutant.Units})`,
          },
        },
      },
    },
  });
}

export default generateChart;
