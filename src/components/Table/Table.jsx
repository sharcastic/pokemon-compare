import React from "react";
import "./Table.scss";

const Table = ({
  data,
  selectedPokemonIndex,
  setShowModal,
  selectedAttributes
}) => (
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
          <th>{data[i].name}</th>
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
                ? data[j][i.toLowerCase()].toString()
                : data[j][i.toLowerCase()]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
