function descendingSortByKey(key) {
  return (a, b) => b[key] - a[key];
}

function sortByAQC(stations) {
  const AQC = ["Extremely Poor", "Very Poor", "Poor", "Fair", "Good"];
  const categories = AQC.map((category) => category.toUpperCase());
  // Define a custom comparison function
  const compare = (a, b) => {
    const categoryA = categories.indexOf(a.AirQualityCategory);
    const categoryB = categories.indexOf(b.AirQualityCategory);

    // Compare based on the category index
    if (categoryA < categoryB) {
      return -1;
    } else if (categoryA > categoryB) {
      return 1;
    } else {
      return 0;
    }
  };

  // Use the custom comparison function to sort the array
  return stations.slice().sort(compare);
}

export { descendingSortByKey, sortByAQC };
