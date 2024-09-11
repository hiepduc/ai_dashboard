import React from "react";
import { renderToString } from "react-dom/server";
import { replaceSpace, replaceUnderscore } from "../string/stringProcess";
import capitaliseCase from "../string/capitalCase";

// function MarkerContent(station, csvData) {
//   const title = station.SiteName;
//   return renderToString(
//     <div className="marker-content">
//       <div className="marker-title-container">
//         <div className="marker-header">
//           <h2 className="marker-title">{title} Station</h2>
//           <p className="marker-latlng">
//             <b>Latitude: </b> {station.Latitude} | <b>Longitude: </b>{" "}
//             {station.Longitude}
//           </p>
//         </div>
//         <div className="marker-title__tabs">
//           {/* <h3 className="tab-item active">Forecast</h3>
//           <h3 className="tab-item">Relevant historical data</h3> */}
//         </div>
//       </div>
//       <div className="tab-content">
//         <div className="chart active">
//           <canvas
//             id={`marker-chart-${title}`}
//             className="marker-chart"
//             width="100"
//             height="100"
//           ></canvas>
//           <StationInfo
//             stationInfo={csvData.stats[replaceSpace(title.toUpperCase())]}
//           />
//         </div>
//         {/* <div className="chart">
//           <canvas
//             id={`NO2-chart-${title}`}
//             className="NO2-chart"
//             width="200"
//             height="200"
//           ></canvas>
//           <canvas
//             id={`WDR-chart-${title}`}
//             className="WDR-chart"
//             width="200"
//             height="200"
//           ></canvas>
//           <canvas
//             id={`WSP-chart-${title}`}
//             className="WSP-chart"
//             width="200"
//             height="200"
//           ></canvas>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// function StationInfo({ stationInfo }) {
//   return (
//     <div className="stats">
//       <h3>Station statistics</h3>
//       <ul>
//         {Object.entries(stationInfo).map(([key, value]) => (
//           <li key={key}>
//             <b>{replaceUnderscore(key)}:</b> {value}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default MarkerContent;

function MarkerContent(entity, csvData, type) {
  // const title = type === "station" ? entity.SiteName : entity.sensorId;
  const title = entity.SiteName;
  console.log("buckle5 marker content", entity);

  // const isStation = type === "station";
  return renderToString(
    <div className="marker-content">
      <div className="marker-title-container">
        <div className="marker-header">
          <h2 className="marker-title">
            {title} {capitaliseCase(type)}
          </h2>
          <p className="marker-latlng">
            <b>Latitude: </b> {entity.Latitude} | <b>Longitude: </b>{" "}
            {entity.Longitude}
          </p>
        </div>
        <div className="marker-title__tabs">
          {/* <h3 className="tab-item active">Forecast</h3>
          <h3 className="tab-item">Relevant historical data</h3> */}
        </div>
      </div>
      <div className="tab-content">
        <div className="chart active">
          <canvas
            id={`marker-chart-${entity.Site_Id}`}
            className="marker-chart"
            width="100"
            height="100"
          ></canvas>
          {type === "station" && (
            <StationInfo
              stationInfo={csvData.stats[replaceSpace(title.toUpperCase())]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function StationInfo({ stationInfo }) {
  return (
    <div className="stats">
      <h3>{stationInfo.title || "Statistics"}</h3>
      <ul>
        {Object.entries(stationInfo).map(([key, value]) => (
          <li key={key}>
            <b>{replaceUnderscore(key)}:</b> {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MarkerContent;
