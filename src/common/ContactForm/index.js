import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withFormik, FieldArray } from "formik";
import * as Yup from "yup";

import { CPFMask, PhoneMask } from "../MaskInput";

import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import {
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  Fab,
  IconButton
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

let contact = {};

const ContactForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleSubmit,
  match,
  classes
}) => {
  useEffect(() => {
    const { id } = match.params;
    if (id) getContact(id);
  }, []);

  const getContact = async id => {
    try {
      const resp = await API.get(`/contacts/${id}`);
      contact = resp.data.contact;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
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
          className={classes.textField}
          label="CPF"
          value={values.cpf}
          onChange={handleChange}
          required
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

      <FieldArray
        name="phoneNumbers"
        render={arrayHelpers => (
          <div className={classes.phoneNumbers}>
            {values.phoneNumbers &&
              values.phoneNumbers.length &&
              values.phoneNumbers.map((number, index) => (
                <div key={index}>
                  <FormControl
                    className={classes.formControl}
                    error={errors.cpf && touched.cpf}
                    fullWidth
                  >
                    <TextField
                      name={`phoneNumbers[${index}].number`}
                      className={classes.textField}
                      label={`${index === 0 ? "Main" : ""} Phone ${
                        index > 0 ? index + 1 : ""
                      }`}
                      fullWidth
                      onChange={handleChange}
                      value={values.phoneNumbers[index].number}
                      InputLabelProps={{
                        shrink: true
                      }}
                      InputProps={{
                        inputComponent: PhoneMask
                      }}
                    />
                    {values.phoneNumbers[index].number &&
                      index === values.phoneNumbers.length - 1 && (
                        <IconButton
                          style={{
                            position: "absolute",
                            right: index === 0 ? 0 : 30
                          }}
                          onClick={() => arrayHelpers.push({ number: "" })}
                        >
                          <AddCircleOutline />
                        </IconButton>
                      )}
                    {index !== 0 && values.phoneNumbers.length > 1 && (
                      <IconButton
                        style={{ position: "absolute", right: 0 }}
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                    )}
                  </FormControl>
                </div>
              ))}
          </div>
        )}
      />
      {errors.apiErrors && (
        <Typography style={{ color: "#f44336", fontSize: 12 }}>
          {errors.apiErrors}
        </Typography>
      )}
      <Fab className={classes.fab} type="submit">
        <Check />
      </Fab>
    </form>
  );
};

const ContactFormSchema = () =>
  Yup.object().shape({
    name: Yup.string()
      .min(3, "Full name must min 3 characters")
      .max(30, "Full name must max 30 characters")
      .required("Name is required"),
    cpf: Yup.string().required("CPF is required"),
    phoneNumbers: Yup.string()
  });

const SignFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    _id: contact._id || "",
    name: contact.name || "",
    cpf: contact.cpf || "",
    phoneNumbers: contact.phoneNumbers || [{ number: "" }]
  }),
  validationSchema: ContactFormSchema,

  handleSubmit: async (values, { props, setFieldError }) => {
    try {
      if (values._id) {
        await API.put(`/contacts/${values._id}`, {
          name: values.name,
          cpf: values.cpf,
          phoneNumbers: values.phoneNumbers
        });
      } else {
        await API.post(`/contacts`, {
          name: values.name,
          cpf: values.cpf,
          phoneNumbers: values.phoneNumbers
        });
      }
      props.history.goBack();
    } catch (error) {
      setFieldError("apiErrors", error.message);
    }
  },

  displayName: "SignForm"
});

ContactForm.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(SignFormik(ContactForm)));
