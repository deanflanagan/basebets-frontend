import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CurrentStrategies(props) {
  const strategyClicked = (strategy) => (evt) => {
    props.strategyClicked(strategy);
  };

  return (
    <div>
      {props.strategies &&
        props.strategies.map((strat) => {
          return (
            <div key={strat.title}>
              <p>{strat.title}</p>
              <FontAwesomeIcon
                onClick={strategyClicked(strat)}
                icon={faTrash}
              />
            </div>
          );
        })}
    </div>
  );
}

export default CurrentStrategies;
