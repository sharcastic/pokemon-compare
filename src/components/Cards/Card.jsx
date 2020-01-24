import React, { useState } from "react";
import "./Card.scss";

const Card = ({ pokemon, selected, onClick }) => {
  const subText = pokemon.type.toString().toUpperCase();
  const [loading, setLoading] = useState(true);
  return (
    <div className="card-div">
      <img
        style={loading ? { display: "none" } : {}}
        src={pokemon.image}
        alt={pokemon.name}
        onLoad={() => setLoading(false)}
      />
      {loading && (
        <div className="loading-text">
          <span>Loading Image...</span>
        </div>
      )}
      <div className="card-text">
        <h5>{pokemon.name}</h5>
        <h6>{subText}</h6>
      </div>
      <div className="hidden-class">
        <button onClick={onClick}>{selected ? "REMOVE" : "COMPARE"}</button>
      </div>
    </div>
  );
};

export default Card;
