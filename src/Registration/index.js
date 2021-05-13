import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../Components/api-service";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    API.registerUser({
      username,
      password,
    }).then((resp) => {
      if (resp.username[0] === "A user with that username already exists.") {
        setError(
          <div className="login-error">That username is already taken!</div>
        );
      } else history.push("/");
    });
  };

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <h1>Create Account</h1>

      <p>
        Please register your username and email address. After submission, we
        will email you. Confirm your account and you will be ready to login and
        get betting!
      </p>

      <label className="edit-profile-field">
        Username:
        <input
          name="username"
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label className="edit-profile-field">
        Password:
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button>Submit</button>
      <React.Fragment>{error}</React.Fragment>
    </form>
  );
}
