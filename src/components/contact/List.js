import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import API from "../../api";

import {
  List as ListMain,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  IconButton
} from "@material-ui/core";
import { AccountCircle, Add, Delete, ListAlt } from "@material-ui/icons";
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
  },
  deleteButton: {
    color: "red"
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
  const deleteContact = id => history.push(`/contacts/${id}/delete`);

  return (
    <div className={classes.root}>
      <ListMain component="nav">
        {!!list.length &&
          list.map(item => (
            <ListItem key={item._id} button divider>
              <ListItemIcon
                style={{ marginRight: 0 }}
                onClick={() => openContact(item._id)}
              >
                <AccountCircle />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                onClick={() => openContact(item._id)}
              />
              <ListItemIcon style={{ marginRight: 0 }}>
                <IconButton
                  className={classes.deleteButton}
                  aria-label="Delete"
                  onClick={() => deleteContact(item._id)}
                >
                  <Delete />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          ))}
        {!list.length && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "lightgrey"
            }}
          >
            <ListAlt style={{ fontSize: 200 }} />
            There are no contacts
          </div>
        )}
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
