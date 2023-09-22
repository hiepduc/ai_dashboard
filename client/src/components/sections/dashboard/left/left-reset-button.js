import React, { useState, useEffect } from "react";
import { useData } from "../../../../services/Selector/dataContext";
import Button from "./button";
import { resetButton } from "../../../../Configuration/buttonConfig";

const fileNameParameters = ["regions", "models", "pollutants", "timeScopes"];

function ResetButton() {
  const { setSelectedOptions } = useData();

  const resetSelections = () => {
    setSelectedOptions({
      regions: "", // Reset to default value
      pollutants: "", // Reset to default value
      timeScopes: "", // Reset to default value
      models: "",
    });
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
