import LeftPanel from "./left/left-panel";
import MidPanel from "./mid/mid-panel";
import RightPanel from "./right/right-panel";
// import { DataProvider } from "../../../services/Selector/dataContext";
import { LayerVisibilityProvider } from "../../../services/Selector/visibilityContext";

function Dashboard() {
  return (
    // <DataProvider>
      <LayerVisibilityProvider>
        <div className="dashboard">
          <LeftPanel />
          <MidPanel />
          <RightPanel />
        </div>
      </LayerVisibilityProvider>
    // </DataProvider>
  );
}

export default Dashboard;
