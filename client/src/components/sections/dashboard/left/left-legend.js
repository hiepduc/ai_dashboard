import markerCluster from "../../../../assets/images/markerCluster.svg";
import markerPurpleAirCluster from "../../../../assets/images/markerPurpleAirCluster.svg";
import { markerGenerator } from "../../../../utils/Map/svgGenerator";
import React from "react";

function LeftLegend() {
  return (
    <div className="dashboard-block__map-key">
      <h3>Legend</h3>
      <div className="map-key">
        <div className="map-key-container">
          <img
            className="map-key-icon"
            src={markerCluster}
            alt="Blue circle with number of clustered Air quality stations"
          />
          <span>Air quality station cluster</span>
        </div>
        <div className="map-key-container">
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path
              stroke="#fff"
              fill="#524eee"
              d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg> */}
          {/* {markerGenerator("station", 16)} */}
          <span
            dangerouslySetInnerHTML={{ __html: markerGenerator("station", 16,"legend") }}
          />

          <span>Air quality station</span>
        </div>
        <div className="map-key-container">
          <img
            className="map-key-icon"
            src={markerPurpleAirCluster}
            alt="Purple circle with number of clustered PurpleAir sensors"
          />
          <span>PurpleAir sensor cluster</span>
        </div>
        <div className="map-key-container">
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path
              stroke="#fff"
              fill="#aa44aa"
              d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg> */}
          <span
            dangerouslySetInnerHTML={{
              __html: markerGenerator("purpleair", 16),
            }}
          />

          <span>PurpleAir sensor</span>
        </div>
      </div>
    </div>
  );
}

export default LeftLegend;
