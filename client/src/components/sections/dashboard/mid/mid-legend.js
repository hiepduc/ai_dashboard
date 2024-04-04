import { useEffect, useState } from "react";
import { useData } from "../../../../services/Selector/dataContext";
import {
  findAirPollutantByLabel,
  findAirPollutantByCode,
} from "../../../../utils/helper/lookupHelper";

function MidLegend() {
  const { selectedOptions } = useData();

  const monitoringLegend = findAirPollutantByCode("AQC");

  const [currentPollutantLegend, setCurrentPollutantLegend] = useState(null);

  console.log(findAirPollutantByLabel(selectedOptions.pollutants));
  useEffect(() => {
    console.log("AAAAA", selectedOptions);
    setCurrentPollutantLegend(
      findAirPollutantByLabel(selectedOptions.pollutants)
    );
  }, [selectedOptions.pollutants]);
  console.log("currentPollutantLegend", currentPollutantLegend);

  return (
    <div className="map-air-quality-legend">
      {
        currentPollutantLegend
          ? currentPollutantLegend.categories.map((category) => (
              <div className="aq-categories" key={category.label}>
                <div
                  className={`aq-category ${
                    category.label.split(" ").length > 1
                      ? category.label.toLowerCase().replace(/ /g, "-")
                      : category.label.toLowerCase()
                  }`}
                >
                  {category.label}
                </div>
                <span className="quality-value">{category.range}</span>
              </div>
            ))
          : monitoringLegend.categories.map((category) => (
              <div className="aq-categories" key={category.label}>
                <div
                  className={`aq-category ${
                    category.label.split(" ").length > 1
                      ? category.label.toLowerCase().replace(/ /g, "-")
                      : category.label.toLowerCase()
                  }`}
                >
                  {category.label}
                </div>
              </div>
            ))
      }
    </div>
  );
}

export default MidLegend;
