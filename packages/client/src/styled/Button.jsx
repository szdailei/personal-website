import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '@emotion/core';
import styled from '@emotion/styled';

function Button({ onClick, value, children, testId, ...props }) {
  const theme = useContext(ThemeContext);

  // Material design ripple animation
  const RIPPLE_STYLE = {
    position: 'relative',
    overflow: 'hidden',
    transform: 'translate3d(0, 0, 0)',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: 'radial-gradient(circle, #fff 5%, transparent 10.01%)',
      transform: 'scale(10, 10)',
      opacity: 0,
      transition: 'transform 0.5s, opacity 0.7s',
    },
    '&:active:after': {
      transform: 'scale(0, 0)',
      opacity: '0.3',
      transition: '0s',
    },
  };

  const objStyles = {
    cursor: 'pointer',
    width: 'fit-content',
    margin: '4px',
    padding: '4px 8px',
    boxShadow:
      '0 0 2px -2px rgba(29, 39, 231, .1), 0 0 3px 0 rgba(29, 39, 231, .1), 0 0 5px 0 rgba(29, 39, 231, .1), 0 2px 2px -4px rgba(29, 39, 231, .1), 0 4px 8px 0 rgba(29, 39, 231, .1), 0 2px 15px 0 rgba(29, 39, 231, .1)',
    backgroundColor: '#F86E67',
    color: 'rgba(0, 0, 0, 0.87)',
    '&:hover': {
      backgroundColor: '#C84E47',
    },
    ...RIPPLE_STYLE,
    ...props,
    ...theme,
  };

  const StyledDiv = styled.div(objStyles);
  return (
    <StyledDiv onClick={onClick} value={value} data-testid={testId}>
      {children}
    </StyledDiv>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

Button.defaultProps = {
  value: null,
  testId: '',
};

export default Button;
