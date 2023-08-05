// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetails from "./components/SpotDetails"; // Import the SpotDetails component

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* Add the new Route for SpotDetails */}
          <Route exact path="/spots/:spotId" component={SpotDetails} />

          {/* Keep the existing Route for LandingPage */}
          <Route exact path="/" component={LandingPage} />
        </Switch>
      )}
    </>
  );
}

export default App;
