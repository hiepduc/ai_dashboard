// DataContext.js
import { createContext, useContext, useState } from "react";
import { stateConfig } from "../../Configuration/config";

const DataContext = createContext();

function useData() {
  return useContext(DataContext);
}

function DataProvider({ children }) {
  const [csvData, setCSVData] = useState(stateConfig.initForecastData);
  const [selectionState, setSelectionState] = useState(
    stateConfig.initSelectionState
  );
  const [selectedOptions, setSelectedOptions] = useState(
    stateConfig.initSelectedOptions
  );
  const [changedDropdownParam, setChangedDropdownParam] = useState("");
  const [sliderValue, setSliderValue] = useState(stateConfig.initSliderValue); // Initial value
  const [sliderTimeLabel, setSliderTimeLabel] = useState(
    stateConfig.initSliderTimeLabel
  );

  return (
    <DataContext.Provider
      value={{
        csvData,
        setCSVData,
        selectionState,
        setSelectionState,
        selectedOptions,
        setSelectedOptions,
        changedDropdownParam,
        setChangedDropdownParam,
        sliderValue,
        setSliderValue,
        sliderTimeLabel,
        setSliderTimeLabel,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { useData, DataProvider };
