import Dashboard from "../Dashboard/index";
import Login from "../Login/index";
import NotFound from "../NotFound/index";
import Preferences from "../Preferences/index";
import Matchups from "../Matchups/index";
import Registration from "../Registration";

const routes = [
  { path: "/dashboard", component: Dashboard },

  { path: "/matchups", component: Matchups },
  { path: "/preferences", component: Preferences },
  { path: "/registration", component: Registration },
  { path: "/", component: Login },
  { path: "/*", component: NotFound },
];

export default routes;
