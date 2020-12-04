import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function TextArea({ defaultValue, ...styles }) {
  const StyledTextArea = styled.textarea(styles);
  return <StyledTextArea defaultValue={defaultValue} />;
}

TextArea.propTypes = {
  defaultValue: PropTypes.string.isRequired,
};

export default TextArea;
