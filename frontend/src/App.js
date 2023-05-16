import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";

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
      {isLoaded && (
        <Switch>
          <Route exact path={"/"}>
            <h1>Test</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
