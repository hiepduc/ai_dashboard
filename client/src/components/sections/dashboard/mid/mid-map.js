import React, { useRef, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { map } from "leaflet";
// import * as L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "./leaflet.js"
// import markerCluster from "../../../assets/images/markerCluster.svg";
import { MapWidget } from "./map-widget";
import { useData } from "../../../../services/Selector/dataContext";
import { useLayerVisibility } from "../../../../services/Selector/visibilityContext";

export default function LeafletMap() {
  const { csvData, selectedOptions } = useData();
  const { isStationLayerVisible, isSensorLayerVisible } = useLayerVisibility();
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = new MapWidget(containerRef.current);
    }
  }, []);

  useEffect(() => {
    console.log(csvData);
    mapRef.current.getData(csvData);
  }, [csvData]);

  useEffect(() => {
    mapRef.current.getSelection(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    mapRef.current.zoomToRegion(selectedOptions.regions);
  }, [selectedOptions]);

  useEffect(() => {
    mapRef.current.toggleStationClusterVisibility();
  }, [isStationLayerVisible.state]);

  useEffect(() => {
    mapRef.current.toggleSensorClusterVisibility();
  }, [isSensorLayerVisible.state]);

  return <div id="mapid" ref={containerRef}></div>;
}
