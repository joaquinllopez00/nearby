import "./styles/app.scss";
import { useEffect } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Nearby } from "./components/Nearby";
import { WhatIsNearby } from "./components/WhatIsNearby";
import { setCoords } from "./actions/coordsActions";
import { useDispatch } from "react-redux";
import { getEvents } from "./actions/eventActions";
import { Profile } from "./components/Profile";
import { SignInComponent } from "./components/SignIn";
import { SignUpComponent } from "./components/SignUp";
import { EditProfile } from "./components/EditProfile";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCoords());
    dispatch(getEvents());
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
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/profile/signin">
          <SignInComponent />
        </Route>
        <Route exact path="/profile/register">
          <SignUpComponent />
        </Route>
        <Route exact path="/profile/edit-profile">
          <EditProfile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
