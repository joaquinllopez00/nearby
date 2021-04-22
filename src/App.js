import "./styles/app.scss";
import { useEffect } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Nearby } from "./components/Nearby";
import { WhatIsNearby } from "./components/WhatIsNearby";
import { setCoords } from "./actions/coordsActions";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCoords());
  }, []);
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/nearby">
          <Nearby />
        </Route>
        <Route exact path={["/nearby/:id"]}>
          <Nearby />
        </Route>
        <Route exact path="/what-is-nearby">
          <WhatIsNearby />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
