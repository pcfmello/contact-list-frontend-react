import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import API from "../../api";

import {
  List as ListMain,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab
} from "@material-ui/core";
import { AccountCircle, Add } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    padding: 0,
    backgroundColor: theme.palette.background.paper
  },
  fab: {
    margin: 16,
    position: "fixed",
    bottom: 0,
    right: 0
  }
});

const List = ({ history, classes }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const resp = await API.get("/contacts");
      setList(resp.data.contacts);
    } catch (error) {
      console.log(error);
    }
  };

  const openContact = id => history.push(`/contacts/${id}`);

  return (
    <div className={classes.root}>
      <ListMain component="nav">
        {list.map(item => (
          <ListItem
            key={item._id}
            button
            divider
            onClick={() => openContact(item._id)}
          >
            <ListItemIcon style={{ marginRight: 0 }}>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </ListMain>
      <Fab
        color="primary"
        className={classes.fab}
        to="/contacts/add"
        component={Link}
      >
        <Add />
      </Fab>
    </div>
  );
};

List.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(List));
