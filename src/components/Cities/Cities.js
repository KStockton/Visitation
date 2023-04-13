import React, { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import FilterComponent from "../FilterComponents/FilterComponent";
import CityCardContainer from "../CityCardContainer/CityCardContainer";
import NotFound from "../NotFound";
import "./Cities.css";

function CityCardSection({ cities, isLoading, onChangeVisited }) {
  return (
    <div className="cities-card-container">
      <CityCardContainer
        cities={cities}
        isLoading={isLoading}
        onChangeVisited={onChangeVisited}
      />
    </div>
  );
}

const Cities = forwardRef(function Cities(
  { cities, onApplyFilter, isLoading, onChangeVisited },
  ref
) {
  if (cities === null) {
    return;
  }

  return (
    <section className="cities-container" ref={ref}>
      <h3 className="cities-title">Find your next destination</h3>
      <div className="cities-filters">
        <FilterComponent onApplyFilter={onApplyFilter} />
      </div>
      {isLoading === false && cities.length === 0 ? (
        <NotFound />
      ) : (
        <CityCardSection
          cities={cities}
          isLoading={isLoading}
          onChangeVisited={onChangeVisited}
        />
      )}
    </section>
  );
});

Cities.propTypes = {
  onApplyFilter: PropTypes.func,
  onChangeVisited: PropTypes.func,
  isLoading: PropTypes.bool,
  cities: PropTypes.arrayOf(PropTypes.object),
};

export default memo(Cities);
