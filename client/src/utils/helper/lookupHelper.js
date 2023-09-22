import { airPollutants } from "../../Configuration/pollutant";
import { sitesDetails } from "../Map/SiteDetails";

/**
 *
 * @param {String} parameterCode - code of air pollutant according to DPE
 * @returns pollutant - corresponding pollutant object in pollutant.js config file
 */
function findAirPollutantByCode(parameterCode) {
  // Use the find() method to find the object with the specified ParameterCode
  const pollutant = airPollutants.find(
    (pollutant) => pollutant.ParameterCode === parameterCode
  );

  // Return the pollutant object if found, or null if not found
  return pollutant || null;
}

/**
 *
 * @param {String} parameterLabel - label of air pollutant
 * @returns pollutant - corresponding pollutant object in pollutant.js config file
 */
function findAirPollutantByLabel(parameterLabel) {
  // Use the find() method to find the object with the specified ParameterCode
  const pollutant = airPollutants.find(
    (pollutant) => pollutant.label === parameterLabel
  );

  // Return the pollutant object if found, or null if not found
  return pollutant || null;
}

/**
 *
 * @param {String} parameterLabel - label of air pollutant
 * @returns unit - unit of air pollutant
 */
function findAirPollutantUnit(parameterLabel) {
  // Use the find() method to find the object with the specified ParameterCode
  const pollutant = airPollutants.find(
    (pollutant) => pollutant.label === parameterLabel
  );

  // Return the pollutant object if found, or null if not found
  return pollutant.Units || null;
}

/**
 *
 * @param {Number} stationCode - Site_Id of DPE AQS
 * @returns SiteName - SiteName of DPE AQS
 */
function findStationByCode(stationCode) {
  // Use the find() method to find the object with the specified ParameterCode
  const station = sitesDetails.find(
    (station) => station.Site_Id === stationCode
  );

  // Return the pollutant object if found, or null if not found
  return station.SiteName || null;
}

export {
  findAirPollutantByCode,
  findAirPollutantByLabel,
  findAirPollutantUnit,
  findStationByCode,
};
