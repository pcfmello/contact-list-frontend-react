import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { Typography, Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import API from "../../api";

const styles = theme => ({
  showDataValue: {
    fontSize: "1.5em"
  },
  deleteMessage: {
    textAlign: "center",
    marginBottom: 36
  },
  showData: {
    marginBottom: 36
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

const Remove = ({ history, match, classes }) => {
  const [contact, setContact] = useState({});

  useEffect(() => {
    getContact();
  }, []);

  const getContact = async () => {
    try {
      const { id } = match.params;
      const resp = await API.get(`/contacts/${id}`);
      await setContact(resp.data.contact);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async () => {
    try {
      const { id } = match.params;
      await API.delete(`/contacts/${id}`);
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const showData = (label, data) => (
    <div>
      <Typography variant="button">{label}</Typography>
      <Typography
        variant="body1"
        gutterBottom
        className={classes.showDataValue}
      >
        {data}
      </Typography>
    </div>
  );

  return (
    <div className="content">
      <div className={classes.deleteMessage}>
        <Typography variant="body1" className={classes.showDataValue}>
          Are you sure you want to delete this contact?
        </Typography>
      </div>
      <div className={classes.showData}>
        {showData("Name", contact.name)}
        {showData("CPF", contact.cpf)}
      </div>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
        onClick={deleteContact}
      >
        <Delete className={classes.leftIcon} />
        Delete
      </Button>
    </div>
  );
};

Remove.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Remove));
