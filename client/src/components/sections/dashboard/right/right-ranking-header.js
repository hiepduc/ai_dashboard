import { useState, useEffect } from "react";
import { useData } from "../../../../services/Selector/dataContext";
import {
  findAirPollutantUnit,
  findAirPollutantUnitByCode,
} from "../../../../utils/helper/lookupHelper";
import { stateConfig } from "../../../../Configuration/config";

function RightRankingHeader() {
  const { selectedOptions, selectionState } = useData();
  const initPollutantUnit = findAirPollutantUnitByCode(
    stateConfig.initRightPanelPollutant
  );
  const [pollutantUnit, setPollutantUnit] = useState(initPollutantUnit);

  useEffect(() => {
    if (selectedOptions.pollutants) {
      setPollutantUnit(findAirPollutantUnit(selectedOptions.pollutants));
      // console.log("AAA", pollutantUnit);
    }
  }, [selectedOptions]);

  useEffect(() => {
    if (!selectionState) setPollutantUnit(initPollutantUnit);
  }, [selectionState]);

  return (
    <ul className="stations-header">
      <li className="station-name">Stations</li>
      <li className="station-time">Hour</li>
      <li className="station-value">{`(${pollutantUnit})`}</li>
    </ul>
  );
}

export default RightRankingHeader;
