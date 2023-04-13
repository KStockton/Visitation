import React, { useState, useCallback } from "react";
import Select from "react-select";
import { BiFilter } from "react-icons/bi";
import "./FilterComponent.css";

const options = [
  { value: "visit", label: "Visit" },
  { value: "visited", label: "Visited" },
];

function FilterComponent({ filters, onApplyFilter }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleShowDropdown = useCallback(() => {
    setShowDropdown((prevState) => !prevState);
  }, []);

  const handleSelectOptions = useCallback(
    (e, b) => {
      setSelectedOption(e, b);
      onApplyFilter(e);
    },
    [onApplyFilter]
  );

  return (
    <div className="filter-wrapper">
      <button onClick={handleShowDropdown} className="filter-button">
        <BiFilter className="icon" />
        Filter
      </button>
      {showDropdown && (
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", right: 0, bottom: 0 }}>
            <Select
              className="select"
              defaultValue={selectedOption}
              onChange={handleSelectOptions}
              options={options}
              isMulti={false}
              onBlur={handleShowDropdown}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterComponent;
/* {filters.map((filter) => (
              <li key={crypto.randomUUID()}>
                <Checkbox
                  checked={filter.isChecked}
                  name={filter.name}
                  label={filter.name}
                  onChange={onSetFilters}
                  isDisabled={filter.isDisabled}
                />
              </li>
            ))} */
