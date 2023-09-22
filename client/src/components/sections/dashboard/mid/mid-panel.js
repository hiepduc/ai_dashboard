import Slider from "./mid-time-slider";
import LeafletMap from "./mid-map";
import MidLegend from "./mid-legend";
import { LayerVisibilityProvider } from "../../../../services/Selector/visibilityContext";

function MidPanel() {
  return (
    <div className="dashboard-block dashboard-block__map-container">
      <Slider />
      {/* <LayerVisibilityProvider> */}
        <LeafletMap />
      {/* </LayerVisibilityProvider> */}
      <MidLegend />
    </div>
  );
}

export default MidPanel;
