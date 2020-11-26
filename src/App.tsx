import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "./context/Authentication";
import DatastoreProvider from "./context/Datastore";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <DatastoreProvider>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </DatastoreProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
