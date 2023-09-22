// DataContext.js
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

function useData() {
  return useContext(DataContext);
}

function DataProvider({ children }) {
  const [csvData, setCSVData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    regions: "", // Initialize selected options for each dropdown list
    pollutants: "",
    timeScopes: "",
    models: "",
  });
  const [changedDropdownParam, setChangedDropdownParam] = useState("");
  const [sliderValue, setSliderValue] = useState(0); // Initial value
  const [sliderTimeLabel, setSliderTimeLabel] = useState(["--", "--", "--"]);

  return (
    <DataContext.Provider
      value={{
        csvData,
        setCSVData,
        selectedOptions,
        setSelectedOptions,
        changedDropdownParam,
        setChangedDropdownParam,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { useData, DataProvider };
