import React, { useState } from "react";

import Card from "./components/Cards/Card";
import Modal from "./components/Modal/Modal";
import { POKEMON_DATA, ATTRIBUTES } from "./data";
import "./App.scss";

const App = () => {
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState(ATTRIBUTES);
  const [showModal, setShowModal] = useState(false);
  const toggleSelectedState = index => () => {
    if (selectedPokemonIndex.includes(index)) {
      setSelectedPokemonIndex(selectedPokemonIndex.filter(i => i !== index));
    } else {
      setSelectedPokemonIndex([...selectedPokemonIndex, index]);
    }
  };
  const toggleSelectAll = () => {
    if (selectedAttributes.length === 0) {
      setSelectedAttributes(ATTRIBUTES);
    } else {
      setSelectedAttributes([]);
    }
  };
  const selectAttribute = event => {
    const {
      target: { id }
    } = event;
    if (selectedAttributes.includes(id)) {
      setSelectedAttributes(selectedAttributes.filter(i => i !== id));
    } else {
      setSelectedAttributes([...selectedAttributes, id]);
    }
  };
  const handleModalClose = () => setShowModal(false);
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
                <th className="attributes-header">
                  <span>Attributes</span>
                  <span className="edit" onClick={() => setShowModal(true)}>
                    Edit Attributes
                  </span>
                </th>
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
        {selectedAttributes.length === 0 && (
          <div>No Attributes selected to display information!</div>
        )}
        <Modal show={showModal}>
          <section className="modal-content">
            <span>Edit Attributes</span>
            <input type="text"></input>
            <div className="options">
              <div>
                <input
                  type="checkbox"
                  checked={selectedAttributes.length === 4}
                  onClick={toggleSelectAll}
                />
                <span>Select All</span>
              </div>
              {ATTRIBUTES.map(i => (
                <div>
                  <input
                    type="checkbox"
                    checked={selectedAttributes.includes(i)}
                    id={i}
                    onClick={selectAttribute}
                  />
                  <span>{i}</span>
                </div>
              ))}
            </div>
            <button onClick={handleModalClose}>APPLY</button>
          </section>
        </Modal>
      </section>
    </div>
  );
};

export default App;
