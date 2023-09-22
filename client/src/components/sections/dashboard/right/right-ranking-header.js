import { useState, useEffect } from "react";
import { useData } from "../../../../services/Selector/dataContext";
import { findAirPollutantUnit } from "../../../../utils/helper/lookupHelper";

function RightRankingHeader() {
  const { selectedOptions } = useData();
  const [pollutantUnit, setPollutantUnit] = useState("µg/m³");

  useEffect(() => {
    if (selectedOptions.pollutants) {
      setPollutantUnit(findAirPollutantUnit(selectedOptions.pollutants));
      // console.log("AAA", pollutantUnit);
    }
  }, [selectedOptions]);

  return (
    <ul className="stations-header">
      <li className="station-name">Stations</li>
      <li className="station-time">Hour</li>
      <li className="station-value">{`(${pollutantUnit})`}</li>
    </ul>
  );
}

export default RightRankingHeader;
