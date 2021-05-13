import React, { useContext, useState } from "react";
import ProfileContext from "../Components/Layout/profileContext";
import CurrentStrategies from "./strategy-list";
import AllStrategies from "./allStrategies";
import { API } from "../Components/api-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import "./styles.css";

function Preferences() {
  const allTeams = [
    "Chicago White Sox",
    "Detroit Tigers",
    "Washington Nationals",
    "Miami Marlins",
    "Philadelphia Phillies",
    "Houston Astros",
    "Oakland Athletics",
    "San Diego Padres",
    "New York Mets",
    "Seattle Mariners",
    "Baltimore Orioles",
    "Cleveland Indians",
    "Chicago Cubs",
    "Milwaukee Brewers",
    "Cincinnati Reds",
    "Colorado Rockies",
    "Pittsburgh Pirates",
    "Kansas City Royals",
    "Los Angeles Dodgers",
    "Atlanta Braves",
    "Tampa Bay Rays",
    "Texas Rangers",
    "St.Louis Cardinals",
    "San Francisco Giants",
    "New York Yankees",
    "Arizona Diamondbacks",
    "Minnesota Twins",
    "Los Angeles Angels",
    "Toronto Blue Jays",
    "Boston Red Sox",
  ];

  const [token, setToken, deleteToken] = useCookies(["basebets-token"]);
  const { profile, setProfile } = useContext(ProfileContext);
  const [saveToDb, setSaveToDb] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [warning, setWarning] = useState("");

  const logoutUser = () => {
    deleteToken(["basebets-token"]);
    window.location.href = "/";
  };

  const strategyClicked = (strategy) => {
    let testStrategies = profile.strategies.filter(
      (strat) => strat.title !== strategy.title
    );
    setProfile(Object.assign({}, profile, { strategies: testStrategies }));
    setSaveToDb(true);
  };

  const addClicked = (strategy) => {
    var found = false;
    for (var i = 0; i < profile.strategies.length; i++) {
      if (profile.strategies[i].title === strategy.title) {
        found = true;
        break;
      }
    }
    if (found) {
      setWarning("you arleady got his!");
      setTimeout(() => setWarning(""), 2000);
    } else {
      profile.strategies.push(strategy);
      setProfile(
        Object.assign({}, profile, {
          strategies: profile.strategies,
        })
      );
      setSaveToDb(true);
    }
  };

  const editProfileForm = () => {
    if (showForm) setShowForm(false);
    else setShowForm(true);
  };

  const changeSupporting = (evt) => {
    profile.supporting = evt.target.value;
    setSaveToDb(true);
  };
  const changeEmail = (evt) => {
    profile.email = evt.target.value;
    setSaveToDb(true);
  };

  const submitProfileChange = () => {
    console.log("submit changes", profile);
    API.updateProfile(profile.id, profile, token);
  };

  return (
    <React.Fragment>
      <FontAwesomeIcon
        onClick={logoutUser}
        className="signOut"
        icon={faSignOutAlt}
      />
      <div className="bodyForm">
        <div className="strategiesContainer">
          Here are your strategies:
          <CurrentStrategies
            strategies={profile.strategies}
            strategyClicked={strategyClicked}
          />{" "}
        </div>

        <div className="strategiesContainer">
          All available strategies:
          <AllStrategies strategyClicked={addClicked} />
        </div>
      </div>

      <button onClick={editProfileForm}>
        {showForm ? (
          <span>Save your changes in the button below!</span>
        ) : (
          <span>Click here to edit your profile info!</span>
        )}
      </button>
      {showForm ? (
        <React.Fragment>
          <div className="edit-profile-form">
            Enter your changes and click save to save your changes! <br />
            <div className="edit-profile-field">
              {" "}
              <label htmlFor="email">Email: </label>
              <input
                id="email"
                type="email"
                placeholder={profile.email}
                onChange={changeEmail}
              />
            </div>
            <div className="edit-profile-field">
              {" "}
              <label htmlFor="supporting">Team: </label>
              <select onChange={changeSupporting} value={profile.supporting}>
                {allTeams.sort().map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}{" "}
              </select>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>
            Heres your email:
            {profile.email}
          </p>
          <p>
            Heres your team:
            {profile.supporting}
          </p>
        </React.Fragment>
      )}

      <div className="warningBlock">{warning}</div>
      {saveToDb ? (
        <button onClick={submitProfileChange}>Submit your changes here!</button>
      ) : null}
    </React.Fragment>
  );
}

export default Preferences;
