import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation"
import UserAuthForm from "./components/UserAuthForm";
import LoginForm from "./components/LoginForm";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.session);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
  }, [user]);

  return (
    <>
      <div className="app-wrapper">
        <div className="app-navigation-wrapper app-row">
          <Navigation />
        </div>
        <div className="app-body-wrapper app-row">
          <div className="app-body-content-wrapper">
            {isLoaded && (
              <Switch>
                <Route exact path={"/"}>
                  <h1>Home</h1>
                </Route>
                <Route exact path={"/sign-up"}>
                  <UserAuthForm componentType={"create"} />
                </Route>
                <Route exact path={"/login"}>
                  <LoginForm />
                </Route>
              </Switch>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
