import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import { CPFMask, PhoneMask } from "../MaskInput";

import {
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  Fab
} from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import API from "../../api";

const styles = theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    maxWidth: 280,
    width: "100%"
  },
  textField: {
    marginTop: 0
  },
  formControl: {
    marginBottom: theme.spacing.unit
  },
  fab: {
    margin: 16,
    position: "fixed",
    bottom: 0,
    right: 0,
    backgroundColor: "#4caf50",
    color: "white"
  }
});

const ContactForm = ({ history, match, classes }) => {
  const [contact, setContact] = useState({});
  useEffect(() => {
    const { id } = match.params;
    if (id) getContact(id);
  }, []);

  const getContact = async id => {
    try {
      const resp = await API.get(`/contacts/${id}`);
      const contact = resp.data.contact;
      const newContact = { ...contact, phone: contact.phoneNumbers[0].number };
      await setContact(newContact);
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Full name must have at least 3 characters")
      .max(30, "Full name must have a maximun of 30characters")
      .required("Name is required"),
    cpf: Yup.string()
      .min(14, "CPF must have 11 numbers")
      .required("CPF is required"),
    phone: Yup.string()
      .min(14, "Phone must have at least 8 numbers")
      .required("Phone is required")
  });

  const onSubmit = async (values, { setFieldError, setSubmitting }) => {
    try {
      if (values._id) {
        await API.put(`/contacts/${values._id}`, {
          name: values.name,
          cpf: values.cpf,
          phoneNumbers: [{ number: values.phone }]
        });
      } else {
        await API.post(`/contacts`, {
          name: values.name,
          cpf: values.cpf,
          phoneNumbers: [{ number: values.phone }]
        });
      }
      setSubmitting(false);
      history.goBack();
    } catch (error) {
      setFieldError("apiErrors", error.message);
    }
  };

  return (
    <Formik
      {...{ onSubmit, validationSchema }}
      initialValues={{
        _id: contact._id || "",
        name: contact.name || "",
        cpf: contact.cpf || "",
        phone: contact.phone || ""
      }}
      enableReinitialize={true}
      render={({ values, touched, errors, handleChange, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} noValidate>
            <FormControl
              className={classes.formControl}
              error={errors.name && touched.name}
              fullWidth
            >
              <TextField
                id="name"
                name="name"
                className={classes.textField}
                label="Full name"
                value={values.name}
                onChange={handleChange}
                required
                autoFocus
                autoComplete="off"
                error={errors.name && touched.name}
                InputLabelProps={{
                  shrink: true
                }}
              />
              {errors.name && touched.name && (
                <FormHelperText>{errors.name}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              className={classes.formControl}
              error={errors.cpf && touched.cpf}
              fullWidth
            >
              <TextField
                id="cpf"
                name="cpf"
                className={classes.textField}
                label="CPF"
                value={values.cpf}
                onChange={handleChange}
                required
                autoComplete="off"
                error={errors.cpf && touched.cpf}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  inputComponent: CPFMask
                }}
              />
              {errors.cpf && touched.cpf && (
                <FormHelperText>{errors.cpf}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={errors.phone && touched.phone}
              fullWidth
            >
              <TextField
                id="phone"
                name="phone"
                className={classes.textField}
                label="Phone"
                value={values.phone}
                onChange={handleChange}
                required
                autoComplete="off"
                error={errors.phone && touched.phone}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  inputComponent: PhoneMask
                }}
              />
              {errors.phone && touched.phone && (
                <FormHelperText>{errors.phone}</FormHelperText>
              )}
            </FormControl>
            {errors.apiErrors && (
              <Typography className="apiErrors">{errors.apiErrors}</Typography>
            )}
            <Fab className={classes.fab} type="submit">
              <Check />
            </Fab>
          </form>
        );
      }}
    />
  );
};

ContactForm.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(ContactForm));
