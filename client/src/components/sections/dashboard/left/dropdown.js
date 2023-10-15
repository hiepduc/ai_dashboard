import React, { useState, useEffect } from "react";
import capitaliseCase from "../../../../utils/string/capitalCase";
import {regionDetails} from "../../../../utils/Map/SiteDetails"
import { useData } from "../../../../services/Selector/dataContext";
import getForecastFiles from "../../../../services/Selector/getForecastFiles";

function Dropdown(selection) {
  const { selectedOptions, changedDropdownParam } = useData();
  const [combination, setCombination] = useState(null);
  const [available, setAvailable] = useState();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getForecastFiles();
        // Handle the response or set it to your state/context
        setCombination(response);
        // console.log("Combination Response:", combination);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchFiles(); // Call the fetchOption function
  }, []);

  useEffect(() => {
    if (changedDropdownParam) {
      setAvailable(greatFilter(combination, selectedOptions));
    }
  }, [selectedOptions, changedDropdownParam]);

  // console.log("Dropdown list changed: ", selection.selected);
  console.log("Dropdown list field: ", changedDropdownParam);

  let isDisable = false;
  const options = selection.options.map((option, index) => {
    let optionContent;

    if (changedDropdownParam && available) {
      // setAvailable(greatFilter(combination));
      if (selection.label !== changedDropdownParam) {
        const check = available.some((obj) => obj[selection.label] === option);
        if (check) {
          isDisable = !check;
        } else isDisable = true;
      }
    }

    if (selection.label === "regions") {
      // Find the region with the matching label
      const selectedRegion = regionDetails.find(
        (region) => region.label === option
      );

      // If the region is found, use its name as the optionContent
      optionContent = selectedRegion ? selectedRegion.name : "";
    } else if (selection.label === "timeScopes") {
      optionContent = option + " hours";
    } else optionContent = option;

    // Return the JSX <option> element
    // console.log(option);
    return (
      <option key={index} value={option} disabled={isDisable}>
        {optionContent}
      </option>
    );
  });

  return (
    // Run const func "options" to render all available options
    <div className="dropdown-selection">
      <label htmlFor="dropdown-selection__option">{capitaliseCase(selection.label)}</label>
      <br />
      <div className="dropdown-selection__select-box">
        <select
          className="dropdown-selection__option"
          id={selection.id}
          onChange={selection.onChange} //{selection.onChange}
          value={selection.selected}
        >
          <option hidden>Please select</option>
          {options}
        </select>
      </div>
    </div>
  );
}

export default Dropdown;

function greatFilter(filterObj, selectedOptions) {
  return filterObj.filter((obj) => {
    return Object.keys(selectedOptions).every(
      (key) => selectedOptions[key] === "" || obj[key] === selectedOptions[key]
    );
  });
}

// const test1 = {
//   regions: [
//     {
//       regions: "",
//       pollutants: ["", ""],
//       timeScopes: ["", ""],
//     },
//     {
//       regions: "",
//       pollutants: ["", ""],
//       timeScopes: ["", ""],
//     },
//   ],

//   pollutants: [
//     {
//       pollutants: "",
//       regions: ["", ""],
//       timeScopes: ["", ""],
//     },
//     {
//       pollutants: "",
//       regions: ["", ""],
//       timeScopes: ["", ""],
//     },
//   ],
// };

// Get all available options for each dropdown list

// if (changedDropdownParam) {
//   console.log(combination);
//   if (selection.label !== changedDropdownParam) {
//     const matchedCombination = combination[changedDropdownParam].find(
//       (child) =>
//         child[changedDropdownParam] ===
//         selectedOptions[changedDropdownParam]
//     );
//     Object.entries(matchedCombination).forEach(([childKey, childValue]) => {
//       if (
//         childKey !== changedDropdownParam &&
//         childKey === selection.label
//       ) {
//         isDisable = childValue.indexOf(option) === -1;
//         console.log("isDisable ", isDisable);
//       }
//     });
//   }
// }
