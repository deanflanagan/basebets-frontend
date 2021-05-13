import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "../../Config/routes";
import "./styles.css";
import SideMenu from "./sideMenu";
import { CookiesProvider } from "react-cookie";
import ProfileContext from "./profileContext";
import UserContext from "./userContext";

function Layout() {
  const [profile, setProfile] = useState("hello from context");
  const [user, setUser] = useState("");

  return (
    <div id="app">
      <div id="outer-container">
        <React.StrictMode>
          <CookiesProvider>
            <UserContext.Provider value={{ user, setUser }}>
              <ProfileContext.Provider value={{ profile, setProfile }}>
                <Router>
                  <SideMenu
                    pageWrapId={"page-wrap"}
                    outerContainerId={"outer-container"}
                  />
                  <main id="page-wrap">
                    <Switch>
                      {routes.map((route) => (
                        <Route
                          exact
                          key={route.path}
                          path={route.path}
                          component={route.component}
                        />
                      ))}
                    </Switch>
                  </main>
                </Router>
              </ProfileContext.Provider>
            </UserContext.Provider>
          </CookiesProvider>
        </React.StrictMode>
      </div>
    </div>
  );
}

export default Layout;
