// import { content } from "../../../../Configuration/config";
import { useEffect, useState } from "react";
import { useData } from "../../../../services/Selector/dataContext";

function RightHeader() {
  const { selectedOptions } = useData();
  const [headerContent, setHeaderContent] = useState("Up-to-date observations");

  useEffect(() => {
    if (
      selectedOptions.regions &&
      selectedOptions.pollutants &&
      selectedOptions.timeScopes
    ) {
      setHeaderContent(
        `Highest ${selectedOptions.pollutants} level in ${selectedOptions.timeScopes}h forecast`
      );
    }
  }, [selectedOptions]);
  return (
    <div className="station-description">
      <h2>NSW Air Quality Station</h2>
      <h4 className="highest-pollutant">{headerContent}</h4>
    </div>
  );
}
export default RightHeader;
