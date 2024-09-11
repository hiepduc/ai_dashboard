/**
 * 
 * @param {Object} pollutant - object in pollutant.js config file
 * @param {Number} stationValue - measurement of pollutant at station
 * @returns category - label of pollutant (parameter) category
 */

function getCategoryLabel(pollutant, stationValue) {
  if (pollutant) {
    const category = pollutant.categories.find((cat) => {
      const range = cat.range.trim(); // Trim leading and trailing spaces of string
      if (range.startsWith("<")) {
        // Lower bound
        const maxRange = parseFloat(range.slice(1).trim()); // Get the value of lower bound
        return stationValue < maxRange; // Return the category if condition is true
      } else if (range.startsWith(">")) {
        // Upper bound
        const minRange = parseFloat(range.slice(1).trim());
        return stationValue > minRange;
      } else {
        // Middle ranges
        const rangeValues = cat.range.split("-").map((val) => parseFloat(val));
        // console.log(rangeValues);
        const minRange = rangeValues[0];
        const maxRange = rangeValues[1] || Number.POSITIVE_INFINITY;
        return stationValue >= minRange && stationValue <= maxRange;
      }
    });
    if (category) {
      return category.label.replace(/\s+/g, "-").toLowerCase(); // Return formatted class of category
    }
  }
  return ""; // Return empty string if no pollutant matched
}

export default getCategoryLabel;
