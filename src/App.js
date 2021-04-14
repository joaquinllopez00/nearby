import "./styles/app.scss";
import { useEffect } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Nearby } from "./components/Nearby";
import { setCoords } from "./actions/coordsActions";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCoords());
  }, []);
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path="/nearby">
          <Nearby />
        </Route>
      </div>
    </Router>
  );
}

export default App;
