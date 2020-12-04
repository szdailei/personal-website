import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function StyledContainer({ onClick, children, disabled, ...styles }) {
  let objStyles;
  if (disabled) {
    objStyles = {
      ...styles,

      cursor: 'not-allowed',
      backgroundColor: 'rgba(0, 0, 0, 0.06)',
      color: 'rgba(0, 0, 0, 0.36)',
      opacity: '0.5',
    };
  } else {
    objStyles = { ...styles };
  }
  const StyledDiv = styled.div(objStyles);
  return <StyledDiv onClick={onClick}>{children}</StyledDiv>;
}

StyledContainer.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

StyledContainer.defaultProps = {
  onClick: null,
  disabled: false,
};

export default StyledContainer;
