import { useLayerVisibility } from "../../../../services/Selector/visibilityContext";
import Button from "./button";
import { visibilityButton } from "../../../../Configuration/buttonConfig";

function Visibility() {
  const {
    isStationLayerVisible,
    isSensorLayerVisible,
    toggleStationLayer,
    toggleSensorLayer,
  } = useLayerVisibility();
  
  const getButtonClass = (buttonId) => {
    if (buttonId === "toggle-button__station") {
      return isStationLayerVisible.state
        ? "layer-button layer-button__active"
        : "layer-button layer-button__disable";
    } else if (buttonId === "toggle-button__sensor") {
      return isSensorLayerVisible.state
        ? "layer-button layer-button__active"
        : "layer-button layer-button__disable";
    }
  };

  return (
    <>
      <h3>Visibility</h3>
      <div id="button-container">
        {visibilityButton.map((button) => (
          <Button
            key={button.id}
            id={button.id}
            className={getButtonClass(button.id)}
            buttonContent={button.buttonContent}
            onClick={() => {
              if (button.id === "toggle-button__station") {
                toggleStationLayer();
              } else if (button.id === "toggle-button__sensor") {
                toggleSensorLayer();
              }
            }}
          />
        ))}
      </div>
    </>
  );
}
export default Visibility;
