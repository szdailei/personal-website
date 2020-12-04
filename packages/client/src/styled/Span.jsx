import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function Span({ children, ...styles }) {
  const StyledSpan = styled.span(styles);
  return <StyledSpan>{children}</StyledSpan>;
}

Span.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Span;
