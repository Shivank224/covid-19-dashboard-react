import React from "react";
import {
  MapContainer as BasicMap,
  TileLayer,
  Circle,
  Popup,
  MapConsumer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

const casesTypeColors = {
  cases: {
    color: "red",
    multiplier: 800,
  },
  recovered: {
    color: "green",
    multiplier: 1200,
  },
  deaths: {
    color: "red",
    multiplier: 2000,
  },
};
const buildMapData = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={{
        color: casesTypeColors[casesType].color,
        fillColor: casesTypeColors[casesType].color,
        fillOpacity: 0.4,
      }}
      // color={casesTypeColors[casesType].hex}
      // fillColor={casesTypeColors[casesType].hex}
      // fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <img className="info-flag" src={country.countryInfo.flag} alt="" />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0.0a")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0.0a")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0.0a")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export default function CovidMap({ center, zoom, mapData, casesType }) {
  return (
    <BasicMap center={center} zoom={zoom}>
      <MapConsumer>
        {(map) => {
          map.setView(center, zoom);
          return null;
        }}
      </MapConsumer>
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=MnIgzFWylZtVv45BYBLW"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      ></TileLayer>
      {console.log(casesTypeColors[casesType].hex)}
      {buildMapData(mapData, casesType)}
    </BasicMap>
  );
}
