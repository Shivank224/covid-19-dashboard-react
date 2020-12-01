import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 4,
    },
  },
  maintainAspectRatio: true,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;

  for (let date in data.cases) {
    //   console.log(casesType)
    //   console.log(data)
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }

    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

export default function LineChart({ casesType }) {
  const [data, setData] = useState({});
  //    console.log(casesType)
  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          // console.table(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div>
      <h3>
        Worldwide New {casesType.charAt(0).toUpperCase() + casesType.slice(1)}
      </h3>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor:
                  casesType === "recovered"
                    ? "rgba(0,128,0,0.5)"
                    : "rgba(204, 16, 52, 0.5)",
                borderColor: casesType === "recovered" ? "green" : "red",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}
