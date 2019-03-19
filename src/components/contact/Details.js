import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { Typography, Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";

import API from "../../api";

const styles = theme => ({
  fab: {
    margin: 16,
    position: "absolute",
    bottom: 0,
    right: 0
  },
  showDataValue: {
    fontSize: "1.5em"
  },
  phone: { display: "block" }
});

const Details = ({ match, history, classes }) => {
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

  const showPhoneNumbers = list =>
    list.map(phone => (
      <span key={phone._id} className={classes.phone}>
        {phone.number}
      </span>
    ));

  return (
    <div className="content">
      {showData("Name", contact.name)}
      {showData("CPF", contact.cpf)}
      {Boolean(contact.phoneNumbers && contact.phoneNumbers.length) &&
        showData(
          `Phone${contact.phoneNumbers.length > 1 ? "s" : ""}`,
          showPhoneNumbers(contact.phoneNumbers)
        )}
      <Fab
        color="primary"
        className={classes.fab}
        onClick={() => history.push(`/contacts/${match.params.id}/update`)}
      >
        <EditIcon />
      </Fab>
    </div>
  );
};

Details.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Details));
