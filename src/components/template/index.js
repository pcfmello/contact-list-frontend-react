import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { ListAlt, ArrowBackIos, Close } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import { logout } from "../../Auth";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  closeButton: {
    marginRight: -12,
    marginLeft: 20
  },
  body: {
    marginTop: 56,
    width: "100%",
    marginBottom: 56
  },
  appBar: {
    position: "fixed"
  }
};

const Template = ({ history, location, children, classes }) => {
  const logoutApp = () => {
    logout();
    history.push("/");
  };

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={() => history.goBack()}
          >
            {location.pathname === "/contacts" ? <ListAlt /> : <ArrowBackIos />}
          </IconButton>

          <Typography variant="h6" color="inherit" className={classes.grow}>
            CONTACTS APP
          </Typography>
          <IconButton
            className={classes.closeButton}
            color="inherit"
            onClick={logoutApp}
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.body}>{children}</div>
    </React.Fragment>
  );
};

Template.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object,
  classes: PropTypes.object
};

export default withStyles(styles)(withRouter(Template));
