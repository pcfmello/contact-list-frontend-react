import React from "react";
import PropTypes from "prop-types";
import BaseMaskInput from "./BaseMaskInput";

const CPFMask = ({ inputRef, ...rest }) => (
  <BaseMaskInput
    {...{ inputRef, ...rest }}
    mask={[
      /\d/,
      /\d/,
      /\d/,
      ".",
      /\d/,
      /\d/,
      /\d/,
      ".",
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/
    ]}
  />
);

BaseMaskInput.propTypes = {
  inputRef: PropTypes.func.isRequired
};

export default CPFMask;
