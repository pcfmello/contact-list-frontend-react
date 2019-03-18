import React from "react";
import PropTypes from "prop-types";
import BaseMaskInput from "./BaseMaskInput";

const CPFMask = ({ inputRef, ...rest }) => (
  <BaseMaskInput
    {...{ inputRef, ...rest }}
    mask={[
      "(",
      /[1-9]/,
      /[1-9]/,
      ")",
      " ",
      /[1-9]/,
      /[1-9]/,
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      /\d/,
      /\d/
    ]}
  />
);

BaseMaskInput.propTypes = {
  inputRef: PropTypes.func.isRequired
};

export default CPFMask;
