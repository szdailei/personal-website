import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

function Span({ children, ...styles }) {
  const Styled = styled.span(styles);
  return <Styled>{children}</Styled>;
}

Span.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Span;
