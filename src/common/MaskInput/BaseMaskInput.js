import React from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";

const BaseMaskInput = ({ inputRef, mask, ...rest }) => (
  <MaskedInput
    {...rest}
    ref={ref => {
      inputRef(ref ? ref.inputElement : null);
    }}
    {...{ mask }}
    placeholderChar={"\u2000"}
  />
);

BaseMaskInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
  mask: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default BaseMaskInput;
