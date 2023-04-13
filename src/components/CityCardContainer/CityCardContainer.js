import React, { memo } from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./CityCardContainer.css";
import ReactLoading from "react-loading";

const CityCardContainer = ({ cities, isLoading, onChangeVisited }) => {
  return (
    <>
      {isLoading ? (
        <div className="react-loading-wrapper">
          <ReactLoading type={"bars"} color={"#000"} height={667} width={375} />
        </div>
      ) : (
        <div className="cards-wrapper">
          {cities.map((city) => {
            return (
              <Card
                key={crypto.randomUUID()}
                city={city}
                onChangeVisited={onChangeVisited}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

CityCardContainer.propTypes = {
  isLoading: PropTypes.bool,
  onChangeVisited: PropTypes.func,
  cities: PropTypes.arrayOf(PropTypes.object),
};

export default memo(CityCardContainer);
