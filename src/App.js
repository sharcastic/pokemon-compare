import React, { useState } from "react";

import Card from "./components/Cards/Card";
import { POKEMON_DATA } from "./data";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <header className="header">
        <h3>Compare Pokemon</h3>
      </header>
      <section className="cards-container">
        {POKEMON_DATA.map(pokemon => (
          <Card pokemon={pokemon} />
        ))}
      </section>
      <section className="table-container">Table goes here!</section>
    </div>
  );
};

export default App;
