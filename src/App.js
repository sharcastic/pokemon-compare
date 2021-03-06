import React, { useState, useEffect } from "react";

import Card from "./components/Cards/Card";
import Modal from "./components/Modal/Modal";
import Table from "./components/Table/Table";
import { POKEMON_DATA, ATTRIBUTES } from "./data";
import "./App.scss";

const DEFAULT_ATTRIBUTES = ["Select All", ...ATTRIBUTES];

const App = () => {
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState(ATTRIBUTES);
  const [filterAttributes, setFilterAttributes] = useState([
    ...DEFAULT_ATTRIBUTES
  ]);
  const [showModal, setShowModal] = useState(false);
  const [searchString, setSearchString] = useState("");

  // This useEffect is used to change the attributes based on the search String
  useEffect(() => {
    if (searchString === "") {
      setFilterAttributes([...DEFAULT_ATTRIBUTES]);
    } else {
      setFilterAttributes(
        DEFAULT_ATTRIBUTES.filter(
          i => i.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
        )
      );
    }
  }, [searchString]);

  // This method is used to select or deselect pokemon based on their indexes.
  const toggleSelectedState = index => () => {
    if (selectedPokemonIndex.includes(index)) {
      setSelectedPokemonIndex(selectedPokemonIndex.filter(i => i !== index));
    } else {
      setSelectedPokemonIndex([...selectedPokemonIndex, index]);
    }
  };

  // This method is used to toggle the state of the checkboxes.
  const selectAttribute = event => {
    const {
      target: { id }
    } = event;
    if (id === "Select All") {
      if (selectedAttributes.length !== ATTRIBUTES.length) {
        setSelectedAttributes(ATTRIBUTES);
      } else {
        setSelectedAttributes([]);
      }
    } else if (selectedAttributes.includes(id)) {
      setSelectedAttributes(selectedAttributes.filter(i => i !== id));
    } else {
      setSelectedAttributes([...selectedAttributes, id]);
    }
  };

  // This method is used to handle closing of the modal.
  const handleModalClose = () => {
    setShowModal(false);
    setSearchString("");
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
          <Table
            data={POKEMON_DATA}
            selectedPokemonIndex={selectedPokemonIndex}
            setShowModal={setShowModal}
            selectedAttributes={selectedAttributes}
          />
        )}
        {selectedAttributes.length === 0 && (
          <div>No Attributes selected to display information!</div>
        )}
        <Modal show={showModal}>
          <section className="modal-content">
            <h4>Edit Attributes</h4>
            <input
              className="search-input"
              placeholder="Search attributes"
              type="text"
              value={searchString}
              onChange={event => setSearchString(event.target.value)}
            ></input>
            <div className="options">
              {filterAttributes.length === 0 ? (
                <div className="alternate-text">No matching attributes</div>
              ) : (
                filterAttributes.map(i => (
                  <div className="attribute-content">
                    <input
                      type="checkbox"
                      checked={
                        i === "Select All"
                          ? selectedAttributes.length === 4
                          : selectedAttributes.includes(i)
                      }
                      id={i}
                      onClick={selectAttribute}
                    />
                    <span>{i}</span>
                  </div>
                ))
              )}
            </div>
            <button className="modal-apply" onClick={handleModalClose}>
              APPLY
            </button>
          </section>
        </Modal>
      </section>
    </div>
  );
};

export default App;
