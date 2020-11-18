import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "./context/Authentication";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
