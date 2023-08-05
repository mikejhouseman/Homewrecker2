// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
// import LoginFormModal from "./components/LoginFormModal";
// import SignupFormModal from "./components/SignupFormModal";
// import SpotDetails from "./components/SpotDetails";
// import ManageSpots from "./components/ManageSpots";

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
          {/* <Route exact path="/login">
            <LoginFormModal />
          </Route>
          <Route exact path="/signup">
            <SignupFormModal />
          </Route> */}
          <Route exact path="/" component={LandingPage} key={window.location.pathname} />
        </Switch>
      )}
    </>
  );
}


  // return (
  //   <>
  //     <Navigation isLoaded={isLoaded} />
  //     {isLoaded && <Switch>
  //       {/* Landing Page */}
  //       {/* <Route exact path="/">
  //       <LandingPage />
  //       </Route> */}
  //       {/* Route exact path = "/spots/${spotId}' SpotDetails */}
  //       {/* <Route exact path="/spots/:spotId">
  //         <SpotDetails />
  //       </Route> */}
  //      {/* Route exact path = "/users/${userId}/spots" ManageSpots */}
  //       {/* <Route exact path="/:userId/spots">
  //         <ManageSpots />
  //       </Route> */}
  //     </Switch>}

  //   </>
  // );
// }

export default App;
