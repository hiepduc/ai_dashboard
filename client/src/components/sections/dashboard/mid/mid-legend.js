import { useEffect, useState } from "react";
import { useData } from "../../../../services/Selector/dataContext";
import { findAirPollutantByLabel } from "../../../../utils/helper/lookupHelper";
import { airPollutants } from "../../../../Configuration/pollutant";

function MidLegend() {
  const { selectedOptions } = useData();

  const [currentPollutantLegend, setCurrentPollutantLegend] = useState(null);
  const a = {
    ParameterCode: "OZONE",
    label: "O3",
    ParameterDescription: "Ozone",
    Units: "pphm",
    categories: [
      { label: "Good", range: "< 5.4" },
      { label: "Fair", range: "5.4 - 8.0" },
      { label: "Poor", range: "8.0 - 12.0" },
      { label: "Very poor", range: "12.0 - 16.0" },
      { label: "Extremely poor", range: "> 16.0" },
    ],
  };
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
      {currentPollutantLegend ? (
        currentPollutantLegend.categories.map((category) => (
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
      ) : (
        <h3>No pollutant legend available.</h3>
      )}
    </div>
  );
}

export default MidLegend;
