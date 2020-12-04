import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function Option({ value, label, ...styles }) {
  const objStyles = {
    ...styles,
  };
  const StyledOption = styled.option(objStyles);
  return <StyledOption value={value}>{label}</StyledOption>;
}

Option.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Option;
