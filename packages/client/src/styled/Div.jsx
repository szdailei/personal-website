import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function Div({ onClick, children, ...styles }) {
  const StyledDiv = styled.div(styles);
  return <StyledDiv onClick={onClick}>{children}</StyledDiv>;
}

Div.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Div.defaultProps = {
  onClick: null,
};

export default Div;
