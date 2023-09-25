// import { content } from "../../../../Configuration/config";
import { useEffect, useState } from "react";
import { useData } from "../../../../services/Selector/dataContext";
import { stateConfig } from "../../../../Configuration/config";

function RightHeader() {
  const { selectedOptions, selectionState } = useData();
  const [headerContent, setHeaderContent] = useState(
    stateConfig.initRightPanelHeader
  );

  useEffect(() => {
    if (
      selectedOptions.regions &&
      selectedOptions.pollutants &&
      selectedOptions.timeScopes
    ) {
      setHeaderContent(
        `Highest ${selectedOptions.pollutants} level of ${selectedOptions.regions} stations in ${selectedOptions.timeScopes}h forecast`
      );
    }
  }, [selectedOptions]);

  useEffect(() => {
    if (!selectionState) setHeaderContent(stateConfig.initRightPanelHeader);
  }, [selectionState]);

  return (
    <div className="station-description">
      <h2>NSW Air Quality Station</h2>
      <h4 className="highest-pollutant">{headerContent}</h4>
    </div>
  );
}
export default RightHeader;
