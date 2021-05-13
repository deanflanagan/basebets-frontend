import React, { useContext } from "react";
import ProfileContext from "../Components/Layout/profileContext";
import BetFormatter from "../Dashboard/BetFormatter";

function Matchups() {
  const testDate = 1617903328000;
  const { profile } = useContext(ProfileContext);
  console.log(testDate);

  const showBets = () => {
    console.log(profile.bets);
  };

  return (
    <React.Fragment>
      <h1>Upcoming Games your Strategies have Picked!</h1>
      <p>
        These are some upcoming games your systems have chosen! You will get an
        email reminder 60 minutes before the first innings to get on!
      </p>
      <button onClick={showBets}>Try me</button>
      <BetFormatter bets={profile.bets} cutoff={testDate} />
    </React.Fragment>
  );
}

export default Matchups;
