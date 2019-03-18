import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";

import Routes from "./routes";

const styles = {
  root: {
    minWidth: 320,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

const App = ({ classes }) => (
  <div className={classes.root}>
    <CssBaseline />
    <Routes />
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
