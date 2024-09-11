import React, { useRef, useEffect } from "react";
import { MapWidget } from "./map-widget";
import { useData } from "@/services/Selector/dataContext";
import { useLayerVisibility } from "@/services/Selector/visibilityContext";
import useVisualizeModeStore from "@/stores/useVisualizeModeStore";

export default function LeafletMap() {
  const { mode, setMode } = useVisualizeModeStore();
  const {
    csvData,
    selectedOptions,
    selectionState,
    stationObsInfo,
    sliderValue,
  } = useData();
  const { isStationLayerVisible, isSensorLayerVisible } = useLayerVisibility();
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = new MapWidget(containerRef.current);
    }
  }, []);

  useEffect(() => {
    mapRef.current.getVisualizeMode(mode);
    console.log("buckle mid map: ", mode);
  }, [mode]);

  useEffect(() => {
    mapRef.current.getStationObsData(stationObsInfo);
  }, [stationObsInfo]);

  useEffect(() => {
    console.log(csvData);
    mapRef.current.getStationForecastData(csvData);
  }, [csvData]);

  useEffect(() => {
    mapRef.current.getSelection(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    mapRef.current.zoomToRegion(selectedOptions.regions, selectionState);
  }, [selectedOptions.regions]);

  useEffect(() => {
    mapRef.current.toggleStationClusterVisibility(isStationLayerVisible.state);
  }, [isStationLayerVisible.state]);

  useEffect(() => {
    mapRef.current.toggleSensorClusterVisibility(isSensorLayerVisible.state);
  }, [isSensorLayerVisible.state]);

  useEffect(() => {
    mapRef.current.setAnimation(sliderValue);
  }, [sliderValue]);

  useEffect(() => {
    mapRef.current.closeSidebar();
  }, [selectionState]);

  return <div id="mapid" ref={containerRef}></div>;
}
