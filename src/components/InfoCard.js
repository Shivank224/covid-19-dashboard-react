import React from "react";
import numeral from "numeral";
export default function InfoCard({
  title,
  todaysData,
  total,
  onClick,
  active,
  isRecovered,
}) {
  return (
    <div
      className={`infoCard ${active && "infoBox--selected"} ${
        !isRecovered && "infoBox--red"
      }`}
      onClick={onClick}
    >
      <h2>{title} </h2>
      <p>{todaysData ? `+${numeral(todaysData).format("0.0a")}` : "+0"}</p>
      <p>{numeral(total).format("0.0a")} in Total</p>
    </div>
  );
}
