import { useState, useEffect, useRef } from "react";
import { useData } from "../../../../services/Selector/dataContext";
import Dropdown from "./dropdown";
import { StoreFileData } from "../../../../services/Selector/selectionChange";
import updateSelection from "../../../../services/Selector/updateSelection";

const Selector = () => {
  const {
    setCSVData,
    selectedOptions,
    setSelectedOptions,
    setChangedDropdownParam,
  } = useData();
  const [options, setOptions] = useState(null); // Set options for dropdown lists
  // const [selectedOptions, setSelectedOptions] = useState({
  //   regions: "", // Initialize selected options for each dropdown list
  //   pollutants: "O3",
  //   timeScopes: "48",
  // }); // State for selected options
  console.log("State test: ", selectedOptions);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await updateSelection();
        // Handle the response or set it to your state/context
        setOptions(response);
        console.log("Option Response:", options);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchOptions(); // Call the fetchOption function
  }, []);

  useEffect(() => {
    console.log("Selected options: ", selectedOptions);
    if (
      selectedOptions.regions &&
      selectedOptions.pollutants &&
      selectedOptions.timeScopes &&
      selectedOptions.models
    ) {
      console.log("Bottle neck ", selectedOptions);
      // Call the fetchData function whenever selectedOptions change
      const fetchData = async () => {
        try {
          const response = await StoreFileData(selectedOptions);
          // Handle the response or set it to your state/context
          console.log("Response:", response);
          setCSVData(response);
          console.log("Data Response:");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData(); // Call the fetchData function
    }
  }, [selectedOptions]); // List selectedOptions as a dependency

  // Handler function to update selected option for a specific field
  const handleOptionChange = (fieldName, selectedOption) => {
    setChangedDropdownParam(fieldName);
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [fieldName]: selectedOption,
    }));
  };

  return (
    <>
      <div className="select-header">
        <h2>Select option</h2>
      </div>

      {options ? ( // options for dropdown lists
        Object.keys(options).map((fieldName, index) => (
          // Render each dropdown list (with all options)
          <Dropdown
            key={index}
            label={fieldName} // fieldName (regions, timescopes, pollutants, models)
            id={`select-${fieldName}`}
            options={options[fieldName]} // all available options in dropdown list
            selected={selectedOptions[fieldName]} // current selected option (selectedOptions[fieldName])
            onChange={(e) => handleOptionChange(fieldName, e.target.value)} // Call the handler
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Selector;
