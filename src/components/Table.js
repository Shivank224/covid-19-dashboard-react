import React from "react";
import numeral from "numeral";

function Table({ tableData }) {
  return (
    <table>
      <tbody>
        {tableData.map((country) => (
          <tr>
            <td>{country.country}</td>
            <td>
              <strong>{numeral(country.cases).format("0,0")}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
