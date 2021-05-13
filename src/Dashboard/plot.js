import React from "react";
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

function BasePlot(props) {
  const cumulativeSum = ((sum) => (value) => (sum += value))(0);
  const betsMade = props.bets.map((f) => f.bet_pl).map(cumulativeSum);
  // console.log(betsMade);
  const sum = props.bets
    .map((v) => v.bet_pl)
    .reduce((sum, current) => sum + current, 0);
  const avg = (sum / props.bets.length) * 100;

  return (
    <React.Fragment>
      <p>
        Your total return is {Math.round(sum)} units from {betsMade.length} bets
        for a yield of {avg.toFixed()}%.
      </p>
      <Plot
        data={[
          {
            x: props.bets.map((f) => new Date(f.match_utc_time)),
            y: betsMade,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          //   {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={{ width: 640, height: 480, title: "Your Bet History" }}
      />
    </React.Fragment>
  );
}

export default BasePlot;
