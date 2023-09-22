import capitaliseCase from "../string/capitalCase";

function convertDataFormat(rankingData) {
  const convertedData = Object.keys(rankingData).map((siteName) => {
    const [date, hour] = rankingData[siteName].timestamp.split(", ");
    return {
      SiteName: capitaliseCase(siteName),
      Value: rankingData[siteName].maxValue,
      Date: date,
      HourDescription: hour,
    };
  });

  return convertedData;
}

export { convertDataFormat };
