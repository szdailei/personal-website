import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

function Button({ onClick, value, children, ...props }) {
  const RIPPLE_STYLE = {
    position: 'relative',
    overflow: 'hidden',
    transform: 'translate3d(0, 0, 0)',

    '&:after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      backgroundImage: 'radial-gradient(circle, #fff 5%, transparent 10.01%)',
      transform: 'scale(10, 10)',
      opacity: '0',
      transition: 'transform 0.5s, opacity 1s',
    },

    '&:active::after': {
      transform: 'scale(0, 0)',
      opacity: '0.2',
      transition: '0s',
    },
  };

  const objStyles = {
    cursor: 'pointer',
    width: 'fit-content',
    margin: '4px',
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: '#F86E67',

    '&:hover': {
      backgroundColor: '#C84E47',
      boxShadow:
        '0 0 2px -2px rgba(29, 39, 231, 0.1), 0 0 3px 0 rgba(29, 39, 231, 0.1), 0 0 5px 0 rgba(29, 39, 231, 0.1), 0 2px 2px -4px rgba(29, 39, 231, 0.1), 0 4px 8px 0 rgba(29, 39, 231, 0.1), 0 2px 15px 0 rgba(29, 39, 231, 0.1)',
    },
    ...RIPPLE_STYLE,
    ...props,
  };

  const StyledDiv = styled.div(objStyles);
  return (
    <StyledDiv onClick={onClick} value={value}>
      {children}
    </StyledDiv>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  value: null,
};

export default Button;
