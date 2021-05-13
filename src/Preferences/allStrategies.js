import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { API } from "../Components/api-service";

function AllStrategies(props) {
  const [token] = useCookies(["basebets-token"]);

  const [availableStrategies, setAvailableStrategies] = useState([]);

  const strategyClicked = (strategy) => (evt) => {
    props.strategyClicked(strategy);
  };

  useEffect(
    () =>
      API.getStrategies(token["basebets-token"]).then((resp) =>
        setAvailableStrategies(resp)
      ),
    [token]
  );

  useEffect(() => {}, []);

  return (
    <div>
      {availableStrategies &&
        availableStrategies.map((strat) => {
          return (
            <div key={strat.title}>
              <p onClick={strategyClicked(strat)}>{strat.title}</p>
              <FontAwesomeIcon onClick={strategyClicked(strat)} icon={faPlus} />
            </div>
          );
        })}
    </div>
  );
}

export default AllStrategies;
