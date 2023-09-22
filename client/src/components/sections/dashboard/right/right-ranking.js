import { useState, useEffect } from "react";
import getCategoryLabel from "../../../../utils/helper/getCategoryLabel";
// import fetchHistoricalObservations from "../../../../services/fetchHistObs";
import { descendingSortByKey } from "../../../../utils/helper/sort";
import { getNewestDataAQS } from "../../../../utils/helper/getNewestDataAQS";
import { convertDataFormat } from "../../../../utils/helper/convertDataFormat";
// import { sitesDetails } from "../../../../AQSs_Info/SiteDetails";
import {
  findAirPollutantByCode,
  findStationByCode,
} from "../../../../utils/helper/lookupHelper";
import { useData } from "../../../../services/Selector/dataContext";

function Ranking() {
  const { csvData } = useData();
  const [useCsvData, setUseCsvData] = useState(false);

  const [stationInfo, setStationInfo] = useState([]);
  const parameters = "PM2.5";

  useEffect(() => {
    const fetchData = async () => {
      let fetchedData = null;

      if (csvData) {
        // Assuming csvData is an array of objects
        fetchedData = convertDataFormat(csvData.ranking);
        fetchedData.sort(descendingSortByKey("Value")); // Change the key as needed
      } else {
        fetchedData = await getNewestDataAQS();
        fetchedData = fetchedData.map((station) => ({
          ...station,
          SiteName: findStationByCode(station.Site_Id),
        }));
        fetchedData.sort(descendingSortByKey("Value")); // Sort based on "Value"
      }

      // Set the sorted data to the state
      setStationInfo(fetchedData);
      console.log(fetchedData);
    };
    fetchData();
  }, [csvData]);

  return (
    <ul className="stations-info">
      {stationInfo.map((station) => {
        const classList = getCategoryLabel(
          findAirPollutantByCode(parameters),
          station.Value
        );

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
                {station.Value.toFixed(2)}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Ranking;
