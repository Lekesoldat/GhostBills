import {
  ColorModeProvider,
  CSSReset,
  theme,
  ThemeProvider,
} from "@chakra-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "./context/Authentication";
import Home from "./pages/Home";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Router>
          <AuthProvider>
            <main>
              <Switch>
                <Route exact path="/" component={Home} />
              </Switch>
            </main>
          </AuthProvider>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default App;
