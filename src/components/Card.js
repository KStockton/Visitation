import React from "react";
import Toggle from "react-toggle";
import "./Card.css";
import "react-toggle/style.css"

function Card({ city, onChangeVisited }) {

  return (
    <div className="card-wrapper">
      <div
        className="card-background"
        style={{ backgroundImage: `url(${city.image})` }}
      />
      <p>
        Name: <span className="city-info">{city.name}</span>
      </p>
      <p>
        Country: <span className="city-info">{city.country}</span>
      </p>
      <div className="card-visit-wrapper">
        <p>Visit Status:</p>
        <Toggle
          defaultChecked={city.visited}
          aria-label="No label tag"
          onChange={() => onChangeVisited(city.id)}
        />
      </div>
      {city.visited && <h2 className="visited-city">visited</h2>}
    </div>
  );
}

export default Card;
