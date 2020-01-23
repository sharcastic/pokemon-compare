import React, { useState } from "react";

import Card from "./components/Cards/Card";
import { POKEMON_DATA, ATTRIBUTES } from "./data";
import "./App.scss";

const App = () => {
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState(ATTRIBUTES);
  const toggleSelectedState = index => () => {
    if (selectedPokemonIndex.includes(index)) {
      setSelectedPokemonIndex(selectedPokemonIndex.filter(i => i !== index));
    } else {
      setSelectedPokemonIndex([...selectedPokemonIndex, index]);
    }
  };
  return (
    <div className="App">
      <header className="header">
        <h3>Compare Pokemon</h3>
      </header>
      <section className="cards-container">
        {POKEMON_DATA.map((pokemon, index) => (
          <Card
            pokemon={pokemon}
            selected={selectedPokemonIndex.includes(index)}
            onClick={toggleSelectedState(index)}
          />
        ))}
      </section>
      <section className="table-container">
        {selectedPokemonIndex.length === 0 ? (
          "No Pokemon Selected"
        ) : (
          <table>
            <thead>
              <tr>
                <th>Attributes</th>
                {selectedPokemonIndex.map(i => (
                  <th>{POKEMON_DATA[i].name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="table-body">
              {selectedAttributes.map(i => (
                <tr className="row">
                  <td className="attribute">{i}</td>
                  {selectedPokemonIndex.map(j => (
                    <td>
                      {i === "Weakness"
                        ? POKEMON_DATA[j][i.toLowerCase()].toString()
                        : POKEMON_DATA[j][i.toLowerCase()]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default App;
