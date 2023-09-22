import { createContext, useContext, useState } from "react";

const LayerVisibilityContext = createContext();

function useLayerVisibility() {
  return useContext(LayerVisibilityContext);
}

function LayerVisibilityProvider({ children }) {
  const [isStationLayerVisible, setIsStationLayerVisible] = useState({
    id: "toggle-button__station",
    state: true,
  });
  const [isSensorLayerVisible, setIsSensorLayerVisible] = useState({
    id: "toggle-button__sensor",
    state: false,
  });
  const [toggleButtonId, setToggleButtonId] = useState("");

  const toggleStationLayer = () => {
    setIsStationLayerVisible((prev) => ({ ...prev, state: !prev.state }));
  };

  const toggleSensorLayer = () => {
    setIsSensorLayerVisible((prev) => ({ ...prev, state: !prev.state }));
  };

  return (
    <LayerVisibilityContext.Provider
      value={{
        toggleButtonId,
        setToggleButtonId,
        isStationLayerVisible,
        isSensorLayerVisible,
        toggleStationLayer,
        toggleSensorLayer,
      }}
    >
      {children}
    </LayerVisibilityContext.Provider>
  );
}

export { useLayerVisibility, LayerVisibilityProvider };
