import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from "./routes";

const App = () => (
  <div className="App" style={{ minWidth: 320}}>
    <CssBaseline />
    <Routes />
  </div>
);

export default App;
