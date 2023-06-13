import { airPollutants } from "./pollutant.js";
import { menuRender } from "./menu.js";
import { legendGenerator } from "./legend.js";

// Load default selection for left pane forecast selector and right pane display
window.addEventListener("DOMContentLoaded", () => {
  const defaultPollutant = airPollutants.find(
    (pollutant) => pollutant.value == "OZONE"
  ); // Assign default pollutant to ozone
  const defaultTimeScope = 24;
  menuRender(defaultPollutant, defaultTimeScope);
  legendGenerator(defaultPollutant);
  // Keep track of the previous selections
  let previousPollutant = defaultPollutant;
  console.log(previousPollutant);
  let previousTime = defaultTimeScope;
  const selectButton = document.querySelector(".select-button");
  selectButton.addEventListener("click", () => {
    const pollutantSelection = document.querySelector("#select-pollutant");
    const selectedPollutant = airPollutants.find(
      (pollutant) => pollutant.value === pollutantSelection.value
    );
    const selectedTime = document.querySelector("#select-time").value;
    // Check if the selections have changed
    if (
      selectedPollutant !== previousPollutant ||
      selectedTime != previousTime
    ) {
      // Execute the functions only if the selections have changed
      menuRender(selectedPollutant, selectedTime);
      legendGenerator(selectedPollutant);

      // Update the previous selections
      previousPollutant = selectedPollutant;
      previousTime = selectedTime;
    }
  });
});
