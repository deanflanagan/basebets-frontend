import React, { useContext, useEffect, useState } from "react";
import ProfileContext from "../Components/Layout/profileContext";
import BetFormatter from "./BetFormatter";
import BasePlot from "./plot";
import { API } from "../Components/api-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

import "./styles.css";

function Dashboard() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [token, setToken, deleteToken] = useCookies(["basebets-token"]);
  const [userLoaded, setUserLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  const arr = [];

  const logoutUser = () => {
    deleteToken(["basebets-token"]);
    window.location.href = "/";
  };

  const [user, setUser] = useState("");

  useEffect(() => {
    API.getUser(token)
      .then((resp) => setUser(resp))
      .then(() => setUserLoaded(true));
  }, [token]);

  useEffect(() => {
    if (userLoaded) {
      API.getProfile(user, token)
        .then((resp) => setProfile(resp))
        .then(() => setProfileLoaded(true));
    }
  }, [userLoaded, token, setProfile, user]);

  const [bets, setBets] = useState([]);
  const [betsLoaded, setBetsLoaded] = useState(false);

  useEffect(() => {
    if (profileLoaded) {
      profile.strategies.map((strategy, idx) => {
        API.getStrategyGames(strategy, token)
          .then((resp) => arr.push(resp))

          .then(() => {
            if (idx + 1 === profile.strategies.length) {
              const finalArr = arr.flat();
              finalArr.sort((a, b) => {
                let da = new Date(a.match_utc_time),
                  db = new Date(b.match_utc_time);
                return da - db;
              });
              setBetsLoaded(true);
              setBets(finalArr);
              profile.bets = finalArr;
            }
          });
      });
    }
  }, [profileLoaded]);

  return (
    <div>
      <h1>Dashboard</h1>
      <FontAwesomeIcon
        onClick={logoutUser}
        className="signOut"
        icon={faSignOutAlt}
      />
      {betsLoaded ? (
        <React.Fragment>
          <div>Welcome back {user.username}!</div>
          {profileLoaded ? (
            <React.Fragment>
              <BasePlot bets={bets} />
              <BetFormatter bets={bets} />
            </React.Fragment>
          ) : null}
        </React.Fragment>
      ) : (
        <div>
          <p>
            You have no strategies set up! Go to Preferences to get set started!
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
