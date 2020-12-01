import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

function Span({ children, ...props }) {
  const StyledSpan = styled.span(props);
  return <StyledSpan>{children}</StyledSpan>;
}

Span.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Span;
