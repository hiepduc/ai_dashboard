function legendGenerator(airPollutant) {
  const legendContainer = document.querySelector(".map-air-quality-legend");
  legendContainer.innerHTML = "";
  if (airPollutant) {
    // Loop through categories of the selected gas
    airPollutant.categories.forEach((category) => {
      const pollutantLegend = document.createElement("div");
      pollutantLegend.classList.add("aq-categories");

      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("aq-category");
      categoryDiv.classList.add(
        `${category.label.replace(/\s+/g, "-").toLowerCase()}`
      );
      categoryDiv.textContent = category.label;
      pollutantLegend.appendChild(categoryDiv);

      const rangeSpan = document.createElement("span");
      rangeSpan.classList.add("quality-value");
      rangeSpan.textContent = category.range;
      pollutantLegend.appendChild(rangeSpan);

      legendContainer.appendChild(pollutantLegend);
    });
  }
}

export { legendGenerator };
