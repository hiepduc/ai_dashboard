import React from "react";
import Button from "./button";
import { useData } from "../../../../services/Selector/dataContext";
import { resetButton } from "../../../../Configuration/buttonConfig";
import { stateConfig } from "../../../../Configuration/config";

function ResetButton() {
  const {
    setCSVData,
    setSelectionState,
    setSelectedOptions,
    setSliderValue,
    setSliderTimeLabel,
  } = useData();

  const resetSelections = () => {
    setCSVData(stateConfig.initForecastData);
    setSelectionState(stateConfig.initSelectionState);
    setSelectedOptions(stateConfig.initSelectedOptions);
    setSliderValue(stateConfig.initSliderValue);
    setSliderTimeLabel(stateConfig.initSliderTimeLabel);
  };

  return (
    <Button
      key={resetButton.id}
      id={resetButton.id}
      className={resetButton.className}
      buttonContent={resetButton.buttonContent}
      onClick={resetSelections}
    />
  );
}

export default ResetButton;
