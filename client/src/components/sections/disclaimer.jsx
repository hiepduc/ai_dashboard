import React, { useState, useEffect } from "react";
import { useData } from "../../services/Selector/dataContext";

const Disclaimer = () => {
  const { csvData } = useData();
  const [useCsvData, setUseCsvData] = useState();

  useEffect(() => {
    if (csvData) {
      setUseCsvData(csvData.stats);
    } else setUseCsvData(null);
  }, [csvData]);

  return (
    <div id="disclaimer">
      {/* <h2 className="disclaimer-flex">Disclaimer placeholder</h2> */}
      <h2 id="stat" className="disclaimer-flex">
        Statistics
      </h2>
      {useCsvData && <StatsTable statsData={useCsvData} />}
    </div>
  );
};

function StatsTable({ statsData }) {
  // Extract station names and statistic names
  const stationNames = Object.keys(statsData);
  const statisticNames =
    stationNames.length > 0 ? Object.keys(statsData[stationNames[0]]) : [];

  return (
    <table className="stats-table">
      <thead>
        <tr>
          <th>Station</th>
          {statisticNames.map((statisticName) => (
            <th key={statisticName}>{statisticName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {stationNames.map((stationName) => (
          <tr key={stationName}>
            <td>{stationName}</td>
            {statisticNames.map((statisticName) => (
              <td key={statisticName}>
                {Number(statsData[stationName][statisticName]).toFixed(4)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Disclaimer;
// const container = document.getElementById("disclaimer");
// const root = ReactDOM.createRoot(container);
// root.render(disclaimer);
