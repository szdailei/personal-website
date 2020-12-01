import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

function TextArea({ defaultValue, ...props }) {
  const StyledTextArea = styled.textarea(props);
  return <StyledTextArea defaultValue={defaultValue} />;
}

TextArea.propTypes = {
  defaultValue: PropTypes.string.isRequired,
};

export default TextArea;
