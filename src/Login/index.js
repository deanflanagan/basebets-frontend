import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../Components/api-service";
import { useCookies } from "react-cookie";
import welcomeImage from "./login.jpg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [promptRegister, setPromptRegister] = useState(false);

  const history = useHistory();
  const [token, setToken] = useCookies(["basebets-token"]);

  const goToRegistration = () => {
    let path = `registration`;
    history.push(path);
  };

  const loginClicked = () => {
    API.loginUser({ username, password }).then((resp) => {
      if (resp.hasOwnProperty("token")) {
        setToken("basebets-token", resp.token);
        history.push("/dashboard");
      } else setPromptRegister(true);
    });
  };

  return (
    <React.Fragment>
      <h2 className="description">
        This is the login page. Welcome to Basebets.com. Can you strike out the
        bookies? Log in or register to get started!
      </h2>
      <div>
        <img src={welcomeImage} alt="Baseball welcome" />
      </div>
      <nav className="demo-buttons">
        <label htmlFor="username"></label>
        <input
          id="username"
          type="text"
          placeholder="Your Username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <label htmlFor="password"></label>
        <input
          id="password"
          type="password"
          placeholder="Your Password"
          onChange={(evt) => setPassword(evt.target.value)}
          value={password}
        />

        <button onClick={loginClicked}>Login</button>

        {promptRegister ? (
          <React.Fragment>
            <div className="login-error">
              Thats not a valid login. Did you want to register? Click to create
              your profile!
            </div>
          </React.Fragment>
        ) : null}
        <button onClick={goToRegistration}>Register Here</button>
      </nav>
    </React.Fragment>
  );
}

export default Login;
