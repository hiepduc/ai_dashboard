import RightHeader from "./right-header";
import Ranking from "./right-ranking";
import RightRankingHeader from "./right-ranking-header";

function RightPanel() {
  return (
    <div className="dashboard-block dashboard-block__right-container">
      <div className="stations-menu">
        <RightHeader />
        <div className="stations-ranking">
          <RightRankingHeader />

          <Ranking />
        </div>
      </div>
    </div>
  );
}

export default RightPanel;
