import React from "react";

export default function Header({ countryDetails, handleCountryInput, value }) {
  return (
    <div className="header">
      <h1 className="headerTitle">Covid-19 Dashboard</h1>
      <div></div>
      <select
        name="countries"
        id="countries"
        value={value}
        onChange={(e) => handleCountryInput(e.target.value)}
      >
        <option value="worldwide">Worldwide</option>

        {countryDetails.map((country) => (
          <option value={country.code}>{country.name} </option>
        ))}
      </select> 
    </div>
  );
}
