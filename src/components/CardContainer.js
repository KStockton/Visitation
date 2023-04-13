import React from "react";
import Card from "./Card";
import "./CardContainer.css";
import ReactLoading from "react-loading";

const CardContainer = ({ cities, isLoading, onChangeVisited }) => {
  if (isLoading) {
    return (
      <ReactLoading type={"bars"} color={"#000"} height={667} width={375} />
    );
  }

  return (
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
  );
};

export default CardContainer;
