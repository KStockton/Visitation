import React, { useState, useCallback, memo } from "react";
import Select from "react-select";
import { BiFilter } from "react-icons/bi";
import PropTypes from "prop-types";
import "./FilterComponent.css";

const options = [
  { value: "visit", label: "Visit" },
  { value: "visited", label: "Visited" },
];

function FilterComponent({ onApplyFilter }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleShowDropdown = useCallback(() => {
    setShowDropdown((prevState) => !prevState);
  }, []);

  const handleSelectOptions = useCallback(
    (option) => {
      setSelectedOption(option);
      onApplyFilter(option);
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
        <div className="select-container">
          <div className="select-wrapper">
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

FilterComponent.propTypes = {
  onApplyFilter: PropTypes.func,
};

export default memo(FilterComponent);
