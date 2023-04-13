import React, { forwardRef } from "react";
import FilterComponent from "./FilterComponent";
import CardContainer from "./CardContainer";
import NotFound from "./NotFound";
import "./Cities.css";

const Cities = forwardRef(function Cities(
  { cities, onFilterData, filters, onApplyFilter, isLoading, onChangeVisited },
  ref
) {

  if (cities === null) {
    return;
  }

  return (
    <section className="cities-wrapper" ref={ref}>
      <h3>Find your next destination</h3>
      <div className="setting-wrapper">
        <FilterComponent
          filters={filters}
          onApplyFilter={onApplyFilter}
          onFilterData={onFilterData}
        />
        {isLoading === false && cities.length === 0 ? (
          <NotFound />
        ) : (
          <CardContainer
            cities={cities}
            isLoading={isLoading}
            onChangeVisited={onChangeVisited}
          />
        )}
      </div>
    </section>
  );
});

export default Cities;
