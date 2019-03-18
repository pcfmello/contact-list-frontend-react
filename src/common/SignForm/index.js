import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { withFormik } from "formik";
import * as Yup from "yup";

import { login } from "../../Auth";

import {
  Paper,
  FormControl,
  FormHelperText,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
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
  sendButton: {
    marginTop: 8
  }
});

const SignForm = ({
  isSignUp,
  values,
  touched,
  errors,
  handleChange,
  handleSubmit,
  classes
}) => (
  <Paper className={classes.paper}>
    <Typography variant="h6" gutterBottom>
      Sign {isSignUp ? "up" : "in"}
    </Typography>
    <form onSubmit={handleSubmit} noValidate>
      {isSignUp && (
        <FormControl
          className={classes.formControl}
          error={errors.name && touched.name}
          fullWidth
        >
          <TextField
            id="name"
            className={classes.textField}
            label="Full name"
            value={values.name}
            onChange={handleChange}
            required
            autoFocus
            error={errors.name && touched.name}
          />
          {errors.name && touched.name && (
            <FormHelperText>{errors.name}</FormHelperText>
          )}
        </FormControl>
      )}

      <FormControl
        className={classes.formControl}
        error={errors.email && touched.email}
        fullWidth
      >
        <TextField
          id="email"
          className={classes.textField}
          label="E-mail"
          value={values.email}
          onChange={handleChange}
          required
          error={errors.email && touched.email}
        />
        {errors.email && touched.email && (
          <FormHelperText>{errors.email}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        className={classes.formControl}
        error={errors.password && touched.password}
        fullWidth
      >
        <TextField
          id="password"
          className={classes.textField}
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange}
          required
          error={errors.password && touched.password}
        />
        {errors.password && touched.password && (
          <FormHelperText>{errors.password}</FormHelperText>
        )}
      </FormControl>

      {isSignUp && (
        <FormControl
          className={classes.formControl}
          error={errors.passwordConfirm && touched.passwordConfirm}
          fullWidth
        >
          <TextField
            id="passwordConfirm"
            className={classes.textField}
            type="password"
            label="Password Confirm"
            value={values.passwordConfirm}
            onChange={handleChange}
            required
            error={errors.passwordConfirm && touched.passwordConfirm}
          />
          {errors.password && touched.passwordConfirm && (
            <FormHelperText>{errors.passwordConfirm}</FormHelperText>
          )}
        </FormControl>
      )}

      {errors.apiErrors && (
        <Typography style={{ color: "#f44336", fontSize: 12 }}>
          {errors.apiErrors}
        </Typography>
      )}

      <Button
        type="submit"
        className={classes.sendButton}
        variant="contained"
        size="large"
        color="primary"
        fullWidth
      >
        Send
      </Button>
    </form>
  </Paper>
);

const SignFormSchema = props =>
  Yup.object().shape({
    name: props.isSignUp
      ? Yup.string()
          .min(3, "Full name must min 3 characters")
          .max(30, "Full name must max 30 characters")
          .required("Name is required")
      : "",
    email: Yup.string()
      .email("Invalid email")
      .required("E-mail is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must min 6 characters"),
    passwordConfirm: props.isSignUp
      ? Yup.string()
          .oneOf([Yup.ref("password"), null])
          .required("Password confirm is required")
      : ""
  });

const SignFormik = withFormik({
  mapPropsToValues: () => ({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  }),
  validationSchema: SignFormSchema,

  handleSubmit: async (values, { props, setFieldError }) => {
    await API.post(`/auth/${props.isSignUp ? "signup" : "signin"}`, {
      name: values.name,
      email: values.email,
      password: values.password
    })
      .then(resp => {
        login(resp.data.token);
        props.history.push(`${props.isSignUp ? "/" : "/contacts"}`);
      })
      .catch(err => {
        setFieldError("apiErrors", err.message);
      });
  },

  displayName: "SignForm"
});

SignForm.propTypes = {
  isSignUp: PropTypes.bool,
  classes: PropTypes.object
};

export default withStyles(styles)(withRouter(SignFormik(SignForm)));
