import fetchHistoricalObservations from "../../services/fetchHistObs";
import { sitesDetails } from "../Map/SiteDetails";

async function getNewestDataAQS() {
  // Example usage
  const parameters = "PM2.5";
  const startDate = "2023-09-13";
  const endDate = "2023-09-14";
  const sites = sitesDetails.map((site) => site.Site_Id);
  const newestStationInfo = [];

  for (const siteId of sites) {
    const response = await fetchHistoricalObservations(
      parameters,
      siteId,
      startDate,
      endDate
    );
    const filteredDataForStation = response.filter(
      (item) => item.Value !== null
    );
    // console.log("Filtered data:", filteredDataForStation);

    if (filteredDataForStation.length > 0) {
      // Get the last element with non-null "Value" for each site
      const lastElement =
        filteredDataForStation[filteredDataForStation.length - 1];
      if (lastElement.Value <= 0) lastElement.Value = -lastElement.Value;
      newestStationInfo.push({
        Site_Id: lastElement.Site_Id,
        Date: lastElement.Date,
        HourDescription: lastElement.HourDescription,
        Value: lastElement.Value,
      });
    }
  }
  return newestStationInfo;
}
export { getNewestDataAQS };
