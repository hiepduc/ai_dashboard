import Selector from "./left-selector";
import LeftLegend from "./left-legend";
import ResetButton from "./left-reset-button";
import Visibility from "./left-visibility";

const LeftPanel = () => {
  return (
    <div className="dashboard-block dashboard-block__left-container">
      <Selector />
      <ResetButton />
      <Visibility />
      <LeftLegend />
    </div>
  );
};

export default LeftPanel;
