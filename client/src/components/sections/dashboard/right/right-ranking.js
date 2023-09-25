import { useState, useEffect } from "react";
import getCategoryLabel from "../../../../utils/helper/getCategoryLabel";
// import fetchHistoricalObservations from "../../../../services/fetchHistObs";
import { descendingSortByKey, sortByAQC } from "../../../../utils/helper/sort";
// import { getNewestDataAQS } from "../../../../utils/helper/getNewestDataAQS";
import { convertDataFormat } from "../../../../utils/helper/convertDataFormat";
// import { sitesDetails } from "../../../../AQSs_Info/SiteDetails";
import {
  // findAirPollutantByCode,
  findAirPollutantByLabel,
  findStationByCode,
} from "../../../../utils/helper/lookupHelper";
import { useData } from "../../../../services/Selector/dataContext";
import getNewestObs from "../../../../services/getNewestObs";

function Ranking() {
  const { csvData, selectedOptions, selectionState } = useData();
  // const [useCsvData, setUseCsvData] = useState(false);

  const [stationObsInfo, setStationObsInfo] = useState([]);
  const [stationForecastInfo, setStationForecastInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let fetchedData = null;

      if (csvData) {
        // Assuming csvData is an array of objects
        fetchedData = convertDataFormat(csvData.ranking);
        fetchedData.sort(descendingSortByKey("Value")); // Change the key as needed
        setStationForecastInfo(fetchedData);
      } else {
        fetchedData = await getNewestObs(selectionState);
        // fetchedData = fetchedData.filter((station) => station.AirQualityCategory === "");
        fetchedData = fetchedData.map((station) => ({
          ...station,
          SiteName: findStationByCode(station.Site_Id),
        }));
        // fetchedData.sort(descendingSortByKey("Value")); // Sort based on "Value"
        setStationObsInfo(sortByAQC(fetchedData));
      }

      // Set the sorted data to the state
      // setStationInfo(fetchedData);
      // console.log(fetchedData);
    };
    fetchData();
  }, [csvData, selectionState]);

  return (
    <ul className="stations-info">
      {(selectionState ? stationForecastInfo : stationObsInfo).map(
        (station) => {
          let classList;
          if (selectionState) {
            classList = getCategoryLabel(
              findAirPollutantByLabel(selectedOptions.pollutants),
              station.Value
            );
          } else {
            classList = station.AirQualityCategory.toLowerCase();
          }
          return (
            <li className="station-item" key={station.SiteName}>
              <div
                className="station-container"
                style={{
                  borderLeft: `8px solid var(--${classList})`,
                }}
              >
                <div className="station-name">{station.SiteName}</div>
                <div className="station-time">
                  <div>{station.HourDescription}</div>
                  <div>{station.Date}</div>
                </div>
                <div className={`station-value ${classList}`}>
                  {selectionState
                    ? station.Value.toFixed(2)
                    : station.AirQualityCategory}
                </div>
              </div>
            </li>
          );
        }
      )}
    </ul>
  );
}

export default Ranking;
