import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link, useRouteMatch } from "react-router-dom";

function SideMenu() {
  const homeMatch = useRouteMatch("/");

  return homeMatch.isExact ? null : (
    <Menu id="slide" className="bm-menu-wrap">
      <div className="bm-menu">
        <nav className="bm-item-list">
          <Link id="about" className="bm-item-list" to="/dashboard">
            Dashboard
          </Link>
          <Link id="matchups" className="bm-item-list" to="/matchups">
            Matchups
          </Link>
          <Link id="matchups" className="bm-item-list" to="/preferences">
            Preferences
          </Link>
        </nav>
      </div>
    </Menu>
  );
}

export default SideMenu;
