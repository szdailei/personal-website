import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function Div({ onClick, children, ...styles }) {
  const Styled = styled.div(styles);
  return <Styled onClick={onClick}>{children}</Styled>;
}

Div.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Div.defaultProps = {
  onClick: null,
};

export default Div;
