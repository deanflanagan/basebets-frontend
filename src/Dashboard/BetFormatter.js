import React from "react";
import "./styles.css";
import DataTable from "react-data-table-component";

function BetFormatter(props) {
  let tempDateTime = (x) => new Date(x);

  const cutoff = props.cutoff ? props.cutoff : 1;

  const reformattedBets = props.bets
    .filter((p) => {
      let temps = tempDateTime(p.match_utc_time).getTime();
      return temps > cutoff;
    })
    .map((p) => {
      var temp = Object.assign({}, p);
      temp.date = tempDateTime(p.match_utc_time).toDateString();
      temp.time = tempDateTime(p.match_utc_time).toTimeString();
      return temp;
    });

  const columns = [
    {
      name: "Home",
      selector: "team",
      sortable: true,
    },
    {
      name: "Visitor",
      selector: "opposition",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },

    {
      name: "First Innings",
      selector: "time",
      sortable: true,
    },
    {
      name: "PL",
      selector: "bet_pl",
    },
  ];

  return (
    <div className="dataTable-container">
      <DataTable
        pagination={true}
        title="Bets"
        columns={columns}
        data={reformattedBets}
      />
    </div>
  );
}

export default BetFormatter;
