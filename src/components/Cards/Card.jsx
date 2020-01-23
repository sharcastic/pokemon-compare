import React from "react";
import "./Card.scss";

const Card = ({ pokemon }) => {
  const subText = pokemon.type.toString().toUpperCase();
  return (
    <div className="card-div">
      <img src={pokemon.image} alt="Pokemon " />
      <div className="card-text">
        <h5>{pokemon.name}</h5>
        <h6>{subText}</h6>
      </div>
      <div className="hidden-class">
        <button>COMPARE!</button>
      </div>
    </div>
  );
};

export default Card;
