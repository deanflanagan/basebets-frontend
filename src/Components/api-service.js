export class API {
  static loginUser(body) {
    return fetch(`https://radiant-caverns-26520.herokuapp.com/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static registerUser(body) {
    return fetch(`https://radiant-caverns-26520.herokuapp.com/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static getUser(token) {
    return fetch(
      "https://radiant-caverns-26520.herokuapp.com/rest-auth/user/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token["basebets-token"]}`,
        },
      }
    ).then((resp) => resp.json());
  }

  static getStrategies(token) {
    return fetch(
      "https://radiant-caverns-26520.herokuapp.com/api/strategies/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    ).then((resp) => resp.json());
  }
  static updateProfile = (profile_id, body, token) => {
    return fetch(
      `https://radiant-caverns-26520.herokuapp.com/api/profiles/${profile_id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(body),
      }
    );
  };

  static getStrategyGames = (strategy, token) => {
    return fetch(
      `https://radiant-caverns-26520.herokuapp.com/api/${strategy.viewset_url}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token["basebets-token"]}`,
        },
      }
    ).then((resp) => resp.json());
  };

  static getProfile = (user, token) => {
    return fetch(
      `https://radiant-caverns-26520.herokuapp.com/api/profiles/${user.pk}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token["basebets-token"]}`,
        },
      }
    ).then((resp) => resp.json());
  };
}
