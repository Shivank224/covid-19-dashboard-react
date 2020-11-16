import React from "react";

import "../styles/global.css";
import Header from "./Header";
import InfoCard from "./InfoCard";
import Table from "./Table";
import LineChart from "./LineChart";
import CovidMap from "./ CovidMap";
export default function App() {
  //states

  const [countryDetails, setCountryDetails] = React.useState([]);
  const [covidDataByCountry, setCovidDataByCountry] = React.useState({});
  const [countryInput, setCountryInput] = React.useState("worldwide");
  const [covidTableData, setCovidTableData] = React.useState([]);
  const [mapData, setMapData] = React.useState([]);
  const [center, setCenter] = React.useState({ lat: 0, lng: 0 });
  const [zoomLevel, setZoomLevel] = React.useState(2);
  // const [flag, setFlag] = React.useState("");
  const [dataType, setDataType] = React.useState("cases");
  const sortTableData = (data) => {
    let sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  };

  React.useEffect(() => {
    const getCountryInfo = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          //  console.table(data);
          const temp = data.map((detail) => ({
            name: detail.country,
            code: detail.countryInfo.iso2,
            // img: detail.countryInfo.flag,
          }));
          // console.table(temp);
          setCountryDetails(temp);
          handleCountryInput("worldwide");
          setCovidTableData(sortTableData(data));
          setMapData(data);
        });
    };
    getCountryInfo();
  }, []);

  const handleCountryInput = async (input) => {
    // console.log(input);
    const countryIso2 = input;
    const dataUrl =
      countryIso2 === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryIso2}`;
    await fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        setCountryInput(countryIso2);
        setCovidDataByCountry(data);

        if (countryIso2 !== "worldwide") {
          setCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long });
          setZoomLevel(4);
        }
      });
  };

  return (
    <div className="app">
      <Header
        countryDetails={countryDetails}
        handleCountryInput={handleCountryInput}
        value={countryInput}
      />
      <div className="main">
        <div className="main_left">
          <InfoCard
            title="Cases"
            todaysData={covidDataByCountry.todayCases}
            total={covidDataByCountry.cases}
            active={dataType === "cases"}
            onClick={() => setDataType("cases")}
          />
          <InfoCard
            title="Recovered"
            todaysData={covidDataByCountry.todayRecovered}
            total={covidDataByCountry.recovered}
            active={dataType === "recovered"}
            isRecovered
            onClick={() => setDataType("recovered")}
          />
          <InfoCard
            title="Deaths"
            todaysData={covidDataByCountry.todayDeaths}
            total={covidDataByCountry.deaths}
            active={dataType === "deaths"}
            onClick={() => setDataType("deaths")}
          />
        </div>
        <div className="main_right">
          <div className="main_right_1">
            <div className="map">
              <CovidMap
                center={center}
                zoom={zoomLevel}
                mapData={mapData}
                casesType={dataType}
              ></CovidMap>
            </div>
          </div>
          <div className="main_right_2">
            <div>
              <h3 className="table_header">
                Covid-19 Cases By Country <span className="live">Live</span>
              </h3>
              <div className="table">
                <Table tableData={covidTableData} />
              </div>
              <div className="chart">
                <LineChart casesType={dataType} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
