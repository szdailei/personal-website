import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function Input({ type, accept, onChange, placeholder, ...props }) {
  const objStyles = {
    cursor: 'text',
    outline: 0,
    borderStyle: 'none none solid none',
    ...props,
  };
  const StyledInput = styled.input(objStyles);
  return <StyledInput type={type} accept={accept} onChange={onChange} placeholder={placeholder} />;
}

Input.propTypes = {
  type: PropTypes.string,
  accept: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  accept: null,
  placeholder: null,
};

export default Input;
