import sitesDetails from "./AQSs_Info/SiteDetails.js";

// Step 1: Read the data from SitesDetails.json (assuming you have the data available as a JavaScript object)
const sitesData = sitesDetails;
// Step 2: Group the sites based on their region
const groupedSites = {};

sitesData.forEach((site) => {
  const region = site["Region"];
  if (!groupedSites[region]) {
    groupedSites[region] = [];
  }
  groupedSites[region].push(site);
});

// Step 3: Find the largest and smallest latitude and longitude for each region
for (const region in groupedSites) {
  const sitesInRegion = groupedSites[region];
  let largestLatitude = Number.NEGATIVE_INFINITY;
  let smallestLatitude = Number.POSITIVE_INFINITY;
  let largestLongitude = Number.NEGATIVE_INFINITY;
  let smallestLongitude = Number.POSITIVE_INFINITY;

  sitesInRegion.forEach((site) => {
    const latitude = site["Latitude"];
    const longitude = site["Longitude"];

    largestLatitude = Math.max(largestLatitude, latitude);
    smallestLatitude = Math.min(smallestLatitude, latitude);
    largestLongitude = Math.max(largestLongitude, longitude);
    smallestLongitude = Math.min(smallestLongitude, longitude);
  });

  // Step 4: Output the results
  console.log(`Region: ${region}`);
  console.log(`Largest Latitude: ${largestLatitude}`);
  console.log(`Smallest Latitude: ${smallestLatitude}`);
  console.log(`Largest Longitude: ${largestLongitude}`);
  console.log(`Smallest Longitude: ${smallestLongitude}`);
  console.log("--------------------");
}

// Region: Sydney East
// CenterRegion.js:36 Largest Latitude: -33.76524
// CenterRegion.js:37 Smallest Latitude: -33.93175
// CenterRegion.js:38 Largest Longitude: 151.24278
// CenterRegion.js:39 Smallest Longitude: 151.0461

// Region: Sydney South-west
// CenterRegion.js:36 Largest Latitude: -33.91766
// CenterRegion.js:37 Smallest Latitude: -34.30621
// CenterRegion.js:38 Largest Longitude: 150.90727
// CenterRegion.js:39 Smallest Longitude: 150.49819

// Region: Illawarra
// CenterRegion.js:36 Largest Latitude: -34.41706
// CenterRegion.js:37 Smallest Latitude: -34.57781
// CenterRegion.js:38 Largest Longitude: 150.88733
// CenterRegion.js:39 Smallest Longitude: 150.78252

// Region: Sydney North-west
// CenterRegion.js:36 Largest Latitude: -33.61641
// CenterRegion.js:37 Smallest Latitude: -33.7995
// CenterRegion.js:38 Largest Longitude: 150.99777
// CenterRegion.js:39 Smallest Longitude: 150.70385

// Region: Upper Hunter
// CenterRegion.js:36 Largest Latitude: -32.12665
// CenterRegion.js:37 Smallest Latitude: -32.64864
// CenterRegion.js:38 Largest Longitude: 151.20895
// CenterRegion.js:39 Smallest Longitude: 150.45824

// Region: Lower Hunter
// CenterRegion.js:36 Largest Latitude: -32.79677
// CenterRegion.js:37 Smallest Latitude: -32.9312
// CenterRegion.js:38 Largest Longitude: 151.75965
// CenterRegion.js:39 Smallest Longitude: 151.66099