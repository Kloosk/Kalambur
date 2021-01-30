import React from 'react';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import Start from "./start/Start";
import {createGlobalStyle} from "styled-components";
import ModeNormal from "./modeNormal/ModeNormal";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const App = () => {
  return (
      <>
          <GlobalStyle/>
          <Router>
              <Switch>
                  <Route exact path="/">
                      <Start/>
                  </Route>
                  <Route exact path="/normal">
                      <ModeNormal/>
                  </Route>
              </Switch>
          </Router>
      </>
  );
};

export default App;
